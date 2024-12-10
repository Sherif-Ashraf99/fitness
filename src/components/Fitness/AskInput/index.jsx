import { useState } from "react";
import styles from "./index.module.css";
import askAliImg from "src/assets/images/Fitness/AskAli.png";
import apis from "src/services/Fitness";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserPhoneNumnberFromCookies } from "src/utils/globalFn";

const postQuestionApiFn = (params) => apis.answers.postQuestion(params);
const checkIsAskedApiFn = (params) => apis.answers.checkIsAsked(params);

const AskInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [isAsked, setIsAsked] = useState(null);

  let userPhoneNumber = getUserPhoneNumnberFromCookies("fitness");
  userPhoneNumber = "01114434011";

  const checkAskedApiParams = {
    msisdn: userPhoneNumber,
  };

  const {
    data: dataAsked,
    isLoading: isLoadingAsked,
    isError: isErrorAsked,
    isFetching: isFetchingAsked,
  } = useQuery({
    queryKey: ["is-asked"],
    queryFn: () => checkIsAskedApiFn(checkAskedApiParams),
    onSuccess: (data) => {
      if (data.status == 400) setIsAsked(true);
      else if (data.status == 200) setIsAsked(false);
    },
  });

  const { data, isLoading, isError, mutate } = useMutation({
    mutationKey: ["post-question"],
    mutationFn: postQuestionApiFn,
    onSuccess: (data) => {
      if (data.status == 200) setIsAsked(true);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const postQuestionApiParams = {
      msisdn: userPhoneNumber,
      ask: inputValue,
    };
    if (inputValue.length !== 0) mutate(postQuestionApiParams);
  };

  if (isLoadingAsked || isFetchingAsked) return <div>Loading...</div>;

  return (
    <div className={styles["ask"]}>
      <div>
        {isAsked ? (
          <p className={styles["question-asked"]}>تم إرسال سؤالك بنجاح</p>
        ) : (
          <div className={styles["input-section"]}>
            <form>
              <label htmlFor="ask">اسأل مظهر</label>
              <textarea
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                maxLength={200}
                type="text"
                placeholder="مثال: ما هو التمرين …….؟"
              />
              <div>
                <span>{`${inputValue.length}/200`}</span>
                <span>{`لديك سؤال واحد فقط لتطرحه في اليوم`}</span>
              </div>
              <button disabled={isLoading} onClick={(e) => handleSubmit(e)}>
                أرسل
              </button>
            </form>
          </div>
        )}
        <div className={styles["img-section"]}>
          <img src={askAliImg} alt="Ali Mazhar Image" />
        </div>
      </div>
      <p>
        سوف يرد مظهر على سؤالك في غضون 2-4 أيام عمل مكتوبة أو بالفيديو. سيتم
        إرسال رابط الفيديو عبر الرسائل القصيرة
      </p>
    </div>
  );
};

export default AskInput;
