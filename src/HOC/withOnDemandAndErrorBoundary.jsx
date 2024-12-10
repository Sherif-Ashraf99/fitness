import { InView } from "react-intersection-observer";
import { ErrorBoundary } from "react-error-boundary";
import PropTypes from "prop-types";
import styles from "./withOnDemandAndErrorBoundary.module.css";
import ErrorMessage from "src/components/Shared/ErrorMessage";

function withOnDemandAndErrorBoundary(WrappedComponent, customStyles) {
  function WithOnDemandAndErrorBoundary(props) {
    const { onDemand = true, gridColumn = "1/-1" } = props;

    return onDemand ? (
      <InView threshold={0.5} triggerOnce={true}>
        {({ inView, ref }) => (
          <ErrorBoundary
            fallback={<ErrorMessage customStyles={customStyles} />}>
            <div
              ref={ref}
              className={`${styles["component"]} ${
                inView ? styles["fade-in-effect"] : ""
              }`}
              style={{ gridColumn }}>
              {inView && <WrappedComponent {...props} />}
            </div>
          </ErrorBoundary>
        )}
      </InView>
    ) : (
      <ErrorBoundary fallback={<ErrorMessage height={customStyles} />}>
        <div style={{ gridColumn }}>
          <WrappedComponent {...props} />
        </div>
      </ErrorBoundary>
    );
  }
  WithOnDemandAndErrorBoundary.propTypes = {
    onDemand: PropTypes.bool,
    gridColumn: PropTypes.string,
  };
  return WithOnDemandAndErrorBoundary;
}

export default withOnDemandAndErrorBoundary;
