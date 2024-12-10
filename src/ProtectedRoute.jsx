import Cookies from "universal-cookie";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

export default function ProtectedRoute({ needSubscribe, children }) {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const cookie = new Cookies();
	const userPhoneNumber =
		cookie.get("international")?.split(",")[1] ||
		cookie.get("local")?.split(",")[1] ||
		cookie.get("africa")?.split(",")[1] ||
		cookie.get("meloukelkora")?.split(",")[1] ||
		cookie.get("othersports")?.split(",")[1];

	if (needSubscribe) {
		const userPhoneNumber = cookie.get("international")?.split(",")[1];

		if (userPhoneNumber) return children;

		return (
			<Navigate to="/international/subscription" state={{ from: pathname }} />
		);
	}

	return children;
	// if(!userPhoneNumber){
	//     return navigate(-1); /*Temporarily */
	//   }

	//   else{
	//      return children;
	//   }
}
