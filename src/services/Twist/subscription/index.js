import AxiosInstance from "src/services/axios-instance";

export const subscription = {

    getHeaderEnrichement: () => AxiosInstance.baseHeaderEnrichmentAxios
        .get('/HeaderEnrichemnt/')
        .then((res) => {
            if (res?.status === 200) return res?.data;
            throw new Error('Call Error!');
        }),

    decryptHeaderEnrichementParam: (param) => {
        const data = new FormData();
        data.append('headerParam', param);

        return AxiosInstance.baseSubscriptionAxios
            .post('rakam1/header-enrichment/decrypt', data, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            })
            .then((res) => res.data)
            .catch((err) => err.response.data)
    },



    local: {
        checkSubsByMsisdn: (msisdn) => {
            const data = new FormData();
            data.append('msisdn', msisdn);

            return AxiosInstance.baseSubscriptionAxios
                .post('rakam1/subscription/checkSubscription', data, {
                    headers: {
                        "Content-Type": 'multipart/form-data'
                    }
                })
                .then((res) => res.data)
                .catch((err) => err.response.data)
        },

        sendCode: (userMsisdn) => AxiosInstance.baseSubscriptionAxios
            .post('rakam1/subscription/send-code', null, {
                params: { msisdn: userMsisdn }, headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((res) => res.data)
            .catch((err) => err.response.data),

        checkPin: (userMsisdn, pin) => AxiosInstance.baseSubscriptionAxios
            .post('rakam1/subscription/check/pin', null, {
                params: { msisdn: userMsisdn, pinCode: pin }, headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((res) => res.data)
            .catch((err) => err.response.data),

        updateSubsToken: (msisdn) => {
            const data = new FormData();
            data.append('msisdn', msisdn);

            return AxiosInstance.baseSubscriptionAxios
                .post('rakam1/subscription/updateToken', data, {
                    headers: {
                        "Content-Type": 'multipart/form-data'
                    }
                })
                .then((res) => res.data)
                .catch((err) => err.response.data)
        },

    },



    international: {
        checkSubsByMsisdn: (msisdn) => {
            const data = new FormData();
            data.append('msisdn', msisdn);

            return AxiosInstance.baseSubscriptionAxios
                .post('elmal3ab/subscription/checkSubscription', data, {
                    headers: {
                        "Content-Type": 'multipart/form-data'
                    }
                })
                .then((res) => res.data)
                .catch((err) => err.response.data)
        },

        sendCode: (userMsisdn) => AxiosInstance.baseSubscriptionAxios
            .post('elmal3ab/subscription/send-code', null, {
                params: { msisdn: userMsisdn }, headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((res) => res.data)
            .catch((err) => err.response),

        checkPin: (userMsisdn, pin) => AxiosInstance.baseSubscriptionAxios
            .post('elmal3ab/subscription/check/pin', null, {
                params: { msisdn: userMsisdn, pinCode: pin }, headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((res) => res.data)
            .catch((err) => err.response.data),

        updateSubsToken: (msisdn) => {
            const data = new FormData();
            data.append('msisdn', msisdn);

            return AxiosInstance.baseSubscriptionAxios
                .post('elmal3ab/subscription/updateToken', data, {
                    headers: {
                        "Content-Type": 'multipart/form-data'
                    }
                })
                .then((res) => res.data)
                .catch((err) => err.response.data)
        },

    },



    africa: {
        checkSubsByMsisdn: (msisdn) => {
            const data = new FormData();
            data.append('msisdn', msisdn);

            return AxiosInstance.baseSubscriptionAxios
                .post('el3almy/subscription/checkSubscription', data, {
                    headers: {
                        "Content-Type": 'multipart/form-data'
                    }
                })
                .then((res) => res.data)
                .catch((err) => err.response.data)
        },

        sendCode: (userMsisdn) => AxiosInstance.baseSubscriptionAxios
            .post('el3almy/subscription/send-code', null, {
                params: { msisdn: userMsisdn }, headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((res) => res.data)
            .catch((err) => err.response.data),

        checkPin: (userMsisdn, pin) => AxiosInstance.baseSubscriptionAxios
            .post('el3almy/subscription/check/pin', null, {
                params: { msisdn: userMsisdn, pinCode: pin }, headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((res) => res.data)
            .catch((err) => err.response.data),

        updateSubsToken: (msisdn) => {
            const data = new FormData();
            data.append('msisdn', msisdn);

            return AxiosInstance.baseSubscriptionAxios
                .post('el3almy/subscription/updateToken', data, {
                    headers: {
                        "Content-Type": 'multipart/form-data'
                    }
                })
                .then((res) => res.data)
                .catch((err) => err.response.data)
        },

    },



    othersports: {
        checkSubsByMsisdn: (msisdn) => {
            const data = new FormData();
            data.append('msisdn', msisdn);

            return AxiosInstance.baseSubscriptionAxios
                .post('othersports/subscription/checkSubscription', data, {
                    headers: {
                        "Content-Type": 'multipart/form-data'
                    }
                })
                .then((res) => res.data)
                .catch((err) => err.response.data)
        },

        sendCode: (userMsisdn) => AxiosInstance.baseSubscriptionAxios
            .post('othersports/subscription/send-code', null, {
                params: { msisdn: userMsisdn }, headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((res) => res.data)
            .catch((err) => err.response.data),

        checkPin: (userMsisdn, pin) => AxiosInstance.baseSubscriptionAxios
            .post('othersports/subscription/check/pin', null, {
                params: { msisdn: userMsisdn, pinCode: pin }, headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((res) => res.data)
            .catch((err) => err.response.data),

        updateSubsToken: (msisdn) => {
            const data = new FormData();
            data.append('msisdn', msisdn);

            return AxiosInstance.baseSubscriptionAxios
                .post('othersports/subscription/updateToken', data, {
                    headers: {
                        "Content-Type": 'multipart/form-data'
                    }
                })
                .then((res) => res.data)
                .catch((err) => err.response.data)
        },

    },



    meloukelkora: {
        checkSubsByMsisdn: (msisdn) => {
            const data = new FormData();
            data.append('msisdn', msisdn);

            return AxiosInstance.baseSubscriptionAxios
                .post('mlokElkora/subscription/checkSubscription', data, {
                    headers: {
                        "Content-Type": 'multipart/form-data'
                    }
                })
                .then((res) => res.data)
                .catch((err) => err.response.data)
        },

        sendCode: (userMsisdn) => AxiosInstance.baseSubscriptionAxios
            .post('mlokElkora/subscription/send-code', null, {
                params: { msisdn: userMsisdn }, headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((res) => res.data)
            .catch((err) => err.response.data),

        checkPin: (userMsisdn, pin) => AxiosInstance.baseSubscriptionAxios
            .post('mlokElkora/subscription/check/pin', null, {
                params: { msisdn: userMsisdn, pinCode: pin }, headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((res) => res.data)
            .catch((err) => err.response.data),

        updateSubsToken: (msisdn) => {
            const data = new FormData();
            data.append('msisdn', msisdn);

            return AxiosInstance.baseSubscriptionAxios
                .post('mlokElkora/subscription/updateToken', data, {
                    headers: {
                        "Content-Type": 'multipart/form-data'
                    }
                })
                .then((res) => res.data)
                .catch((err) => err.response.data)
        },

    },



    fitness: {
        checkSubsByMsisdn: (msisdn) => {
            const data = new FormData();
            data.append('msisdn', msisdn);

            return AxiosInstance.baseSubscriptionAxios
                .post('befit/subscription/checkSubscription', data, {
                    headers: {
                        "Content-Type": 'multipart/form-data'
                    }
                })
                .then((res) => res.data)
                .catch((err) => err.response.data)
        },

        sendCode: (userMsisdn) => AxiosInstance.baseSubscriptionAxios
            .post('befit/subscription/send-code', null, {
                params: { msisdn: userMsisdn }, headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((res) => res.data)
            .catch((err) => err.response.data),

        checkPin: (userMsisdn, pin) => AxiosInstance.baseSubscriptionAxios
            .post('befit/subscription/check/pin', null, {
                params: { msisdn: userMsisdn, pinCode: pin }, headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((res) => res.data)
            .catch((err) => err.response.data),

        updateSubsToken: (msisdn) => {
            const data = new FormData();
            data.append('msisdn', msisdn);

            return AxiosInstance.baseSubscriptionAxios
                .post('befit/subscription/updateToken', data, {
                    headers: {
                        "Content-Type": 'multipart/form-data'
                    }
                })
                .then((res) => res.data)
                .catch((err) => err.response.data)
        }

    },

}