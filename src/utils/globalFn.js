import moment from "moment";
import placeHolderAvatar from "src/assets/images/Twist/user-icon.png";
import {
  IDS,
  NAMES,
  appsBaseUrls,
  otherSports,
  services,
  sportsSupportedByTwist2024,
} from "./globalData";
import Cookies from "universal-cookie";
import apis from "src/services/Twist";
import { getLoggingsParams } from "src/hooks/useLogging/helper";

export const ImgURL = (src, isPlayer, appName = "Twist") => {
  if (src === null || src === undefined)
    return isPlayer ? placeHolderAvatar : "";
  if (src?.startsWith("http")) return src;
  else return appsBaseUrls[appName] + src;
  //   else return import.meta.env.VITE_APP_MEDIA_URL + src;
};

export const getRouteInfo = (pathname) => {
  let route = "",
    serviceId = undefined,
    sportId = 1,
    sportName = undefined,
    serviceName = pathname.split("/")[1];

  if (!services.includes(serviceName)) serviceName = undefined;
  else {
    serviceId = IDS.SERVICES[serviceName.toUpperCase()];
    if (serviceName === "othersports") {
      sportName = pathname.split("/")[2];
      sportId = IDS.SPORTS[sportName?.toUpperCase()];
      if (!otherSports.includes(sportName)) sportName = undefined;
    }
  }
  if (serviceName) {
    route = "/" + serviceName;
    if (serviceName === "othersports" && sportName)
      route = route + "/" + sportName;
  }
  return { route, serviceId, serviceName, sportId, sportName };
};

export function convertFullDate(date, isShortDate = false, lang = "ar") {
  const daysEn = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    monthsEn = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    monthsAr = [
      "يناير",
      "فبراير",
      "مارس",
      "إبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ],
    daysAr = [
      "اﻷحد",
      "اﻷثنين",
      "الثلاثاء",
      "اﻷربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ],
    day = moment(date).format("DD"),
    year = moment(date).year();

  if (lang === "en" && isShortDate) {
    return `${day}${monthsAr[moment(date).month()]} `;
  } else if (lang === "en") {
    return `${daysEn[moment(date).day()]}, ${day} ${
      monthsEn[moment(date).month()]
    } ${year} `;
  } else if (lang === "ar" && isShortDate) {
    return `${day} ${monthsAr[moment(date).month()]} `;
  } else if (lang === "ar") {
    return `${daysAr[moment(date).day()]}, ${day} ${
      monthsAr[moment(date).month()]
    } ${year} `;
  }
}

export const getTime = (dateValue) => {
  const dateStr = dateValue;
  const date = new Date(dateStr);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let period = hours < 12 ? "ص" : "م";
  hours = hours % 12 || 12;
  let formattedTime = `${hours}:${minutes}`;

  return { time: formattedTime, period };
};

export const getServiceAndSportRoute = (service, sport) => {
  if (isNaN(service) && isNaN(sport))
    return `/${service ?? ""}/${sport ?? ""}/`.replace("//", "/");
  const serviceName = NAMES["services"][service];
  const sportName = NAMES["sports"][sport];
  if (sportName === undefined) return `/${serviceName}/`.replace(/\/+/g, "/");
  return `/${serviceName}/${sportName}/`.replace(/\/+/g, "/");
};

export const getUserPhoneNumnberFromCookies = (serviceName) => {
  const cookies = new Cookies();
  const savedService = cookies.get(serviceName);
  return savedService?.split(",")[1];
};

export function logFailedApi(apiName = "") {
  const { ip_address, msisdn, user_session } = getLoggingsParams();

  apis.reports.sendLog({
    ip_address,
    msisdn,
    user_session,
    from_url: apiName,
    to_url: "Failed",
  });
}

export const sendGameReport = (to_url) => {
  const loggingParams = getLoggingsParams();
  apis.reports.sendLog({
    // will be changed
    // from_url: "/international/tournament/726/overview",
    to_url,
    service_id: IDS.SERVICES.INTERNATIONAL,
    ...loggingParams,
  });
};

export const handleNavigateToMatchPage = (
  matchId,
  sportId,
  services,
  tournamentId
) => {
  if (sportId === 1) {
    return `${getServiceAndSportRoute(
      services
    )}${tournamentId}/football-match/${matchId}/match/details`;
  }
  if (sportsSupportedByTwist2024[sportId]) {
    return `${getServiceAndSportRoute(
      services,
      sportId
    )}match/${matchId}/overview`;
  }
};
