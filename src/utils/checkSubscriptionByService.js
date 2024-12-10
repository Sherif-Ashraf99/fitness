import apis from "src/services/Twist";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { useState } from "react";
import Cookies from "universal-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { sharedComponentsContext } from "src/context/shared-context";

const etisalatSubscriptionPortalURL = `http://www.etisalat.eg/etisalat/notification/etisalatsports.html#!/app/sports?lang=ar&paramChannel=422b48515753644e5a37544a492f6c527367304c637635414a43696f3273395a454171687054594d3561343d&sourceId=3&serviceName=`;

const headEnrichmentApiFn = () => apis.subscription.getHeaderEnrichement();
const decryptParamApiFn = (param) =>
	apis.subscription.decryptHeaderEnrichementParam(param);
const checkSubByMsisdnApiFn = (params) =>
	apis.subscription[params.serviceName].checkSubsByMsisdn(params.msisdn);
const updateTokenApiFn = (params) =>
	apis.subscription[params.serviceName].updateSubsToken(params.msisdn);
const sendCodeToTheUserAPiFn = (params) =>
	apis.subscription[params.serviceName].sendCode(params.msisdn);
const checkPinFromTheUserAPiFn = (params) =>
	apis.subscription[params.serviceName].checkPin(params.msisdn, params.pin);

// mahran num : 201142323706
const getPortalSubsName = (service) => {
	if (service === "local") return "Local_Football";
	if (service === "international") return "International_Football";
	if (service === "africa") return "CAN";
	if (service === "othersports") return "OTHERSPORTS";
	if (service === "meloukelkora") return "MELOUK_ELKOORA";
	if (service === "fitness") return "Be_Fit";
	return "not_found";
};

const servicesList = ["fitness"];

export const useCheckSubscriptionByService = (serviceName) => {
	const cookies = new Cookies();
	const { state } = useLocation();
	const navigate = useNavigate();
	const userNumRef = useRef("");
	const { setInitialSharedValues, subscriptionServiceName } = useContext(
		sharedComponentsContext,
	);
	const [startCheckSubscription, setStartCheckSubscription] = useState(false);
	const [redirectToSubscriptionUI, setRedirectToSubscriptionUI] =
		useState(true);
	const [isWifi, setIsWifi] = useState(null);
	const isRunHeaderEnrichment = false;

	let isSubscripedInTheServie;
	if (
		servicesList.includes(serviceName) ||
		state?.from === "/twist-games/questions" ||
		startCheckSubscription
	) {
		isSubscripedInTheServie = !!cookies.get(serviceName);
	} else isSubscripedInTheServie = true;

	const { isInitialLoading: isLoadingHeaderEnrichment } = useQuery({
		queryKey: ["header-enrichment"],
		queryFn: () => headEnrichmentApiFn(),
		onSuccess: (data) => {
			if (data) {
				setIsWifi(true);
				mutateDecrypt(data);
			} else {
				setIsWifi(false);
			}
		},
		enabled: !isSubscripedInTheServie && isRunHeaderEnrichment,
		retry: 10,
	});

	const { isLoading: isLoadingdecrypt, mutate: mutateDecrypt } = useMutation({
		queryKey: ["decrypt-param"],
		mutationFn: decryptParamApiFn,
		onSuccess: (data) => {
			if (data.status == "200") {
				userNumRef.current = data.user;
				mutateCheckSub({
					msisdn: data.user,
					serviceName: subscriptionServiceName,
				});
			} else if (data.status == "500") {
				navigate(-1);
			}
		},
	});

	const { isLoading: isLoadingSubToken, mutate: mutateSubToken } = useMutation({
		queryKey: ["update-token"],
		mutationFn: updateTokenApiFn,
		onSuccess: (data) => {
			cookies.set(
				`${subscriptionServiceName}`,
				`${data.token},${userNumRef.current}`,
				{
					path: "/",
					maxAge: `${60 * 60 * 12}`,
				},
			);
			navigate("/twist-games/questions"); // static work around for now
		},
	});

	const {
		data: dataCheckPin,
		isLoading: isLoadingCheckPin,
		mutate: mutateCheckPin,
	} = useMutation({
		queryKey: ["check-pin"],
		mutationFn: checkPinFromTheUserAPiFn,
		onSuccess: (data) => {
			if (data.status == "200") {
				mutateSubToken({
					msisdn: `2${userNumRef.current}`,
					serviceName: subscriptionServiceName,
				});
				setInitialSharedValues((prev) => ({
					...prev,
					refreshSubscriptionStatus: true,
				}));
			} else if (data.status == "-6") {
				window.location.href =
					etisalatSubscriptionPortalURL +
					getPortalSubsName(subscriptionServiceName);
			}
		},
	});

	const { isLoading: isLoadingCheckSub, mutate: mutateCheckSub } = useMutation({
		queryKey: ["check-sub-by-msisdn"],
		mutationFn: checkSubByMsisdnApiFn,
		onSuccess: (data) => {
			if (data.status == "200" || data.status == "1") {
				mutateSubToken({
					msisdn: userNumRef.current,
					serviceName: subscriptionServiceName,
				});
			} else if (data.status == "-6") {
				window.location.href =
					etisalatSubscriptionPortalURL +
					getPortalSubsName(subscriptionServiceName);
			}
		},
	});

	const {
		data: dataSendCode,
		isLoading: isLoadingSendCode,
		mutate: mutateSendCode,
	} = useMutation({
		queryKey: ["send-code"],
		mutationFn: sendCodeToTheUserAPiFn,
	});

	const handleOnSendCode = (msisdn) => {
		mutateSendCode({
			msisdn: `2${msisdn}`,
			serviceName: subscriptionServiceName,
		});
	};

	const handleOnCheckPin = (msisdn, pin) => {
		userNumRef.current = msisdn;
		mutateCheckPin({
			msisdn: `2${msisdn}`,
			pin: pin,
			serviceName: subscriptionServiceName,
		});
	};

	useEffect(() => {
		if (redirectToSubscriptionUI && serviceName && !isSubscripedInTheServie) {
			setInitialSharedValues((prev) => ({
				...prev,
				subscriptionServiceName: serviceName,
			}));
			navigate(`/${serviceName}/subscription`);
		} else if (!serviceName && !subscriptionServiceName) {
			navigate(-1);
		}
	}, [redirectToSubscriptionUI]);

	return {
		isWifi,
		isSubscripedInTheServie,
		setRedirectToSubscriptionUI,
		handleOnSendCode,
		handleOnCheckPin,
		dataSendCode,
		isLoadingSendCode,
		dataCheckPin,
		isLoadingCheckPin,
		isLoadingHeaderEnrichment,
		isLoadingdecrypt,
		isLoadingCheckSub,
		isLoadingSubToken,
		setStartCheckSubscription,
	};
};
