import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./services/query-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./i18n";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import { register } from "swiper/element/bundle";
import "swiper/css";
import SharedContext from "./context/shared-context";
import App from "./App.jsx";
import "./index.css";
import ReactGA from "react-ga4";

// Google G-tag :
ReactGA.initialize("G-0R0YHZ69G7");

register();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <SharedContext>
      <App />
    </SharedContext>
    <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
  </QueryClientProvider>,
);
