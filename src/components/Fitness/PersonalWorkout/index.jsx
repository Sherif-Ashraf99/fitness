import { useState } from 'react'
import styles from './index.module.css'
import personalWorkoutBanner from "src/assets/images/Fitness/personalWorkoutBanner.png"
import genderMale from "src/assets/images/Fitness/genderMale.svg"
import genderFemale from "src/assets/images/Fitness/genderFemale.svg"
import trainingTypeWeightLoss from "src/assets/images/Fitness/trainingTypeWeightLoss.svg"
import trainingTypeBodyAdjustment from "src/assets/images/Fitness/trainingTypeBodyAdjustment.svg"
import trainingTypeStrength from "src/assets/images/Fitness/trainingTypeStrength.svg"
import clockIcon from "src/assets/images/Fitness/clockIcon.svg"
import apis from 'src/services/Fitness'
import { useMutation } from '@tanstack/react-query'
import { getUserPhoneNumnberFromCookies } from 'src/utils/globalFn'
import { useCheckSubscriptionByService } from 'src/utils/checkSubscriptionByService'
import SubscribeBtn from 'src/components/Shared/Subscription/SubscribeBtn'

const apiFn = (params) => apis.Nutrition.addUserFoodSystem(params)

const PersonalWorkout = () => {
    const userPhoneNumber = getUserPhoneNumnberFromCookies("fitness")
    const { isSubscripedInTheServie, setRedirectToSubscriptionUI } = useCheckSubscriptionByService("fitness");

    if (!isSubscripedInTheServie)
      return (
        <SubscribeBtn setRedirectToSubscriptionUI={setRedirectToSubscriptionUI} />
      );
  

    const {mutate,isSuccess} =  useMutation({
        mutationKey : ["Personal-Workout"],
        mutationFn : apiFn,
       })

    const [isAllInputsFailed, setIsAllInputsFailed] = useState(false)


const [values,SetValues] = useState({
    gender : '',
    birthDate : '',
    weight : '',
    height : '',
    trainingType : '',
    trainingDuration : '',
    trainingHours : '',
    trainingDays : [        
    { dayName: 'Sun', dayNum: 1, isChecked: false },
    { dayName: 'Mon', dayNum: 2, isChecked: false },
    { dayName: 'Tue', dayNum: 3, isChecked: false },
    { dayName: 'Wed', dayNum: 4, isChecked: false },
    { dayName: 'Thu', dayNum: 5, isChecked: false },
    { dayName: 'Fri', dayNum: 6, isChecked: false },
    { dayName: 'Sat', dayNum: 7, isChecked: false },
],

})

const { gender,birthDate,weight,height,trainingType,trainingDays,trainingDuration,trainingHours} = values

const [errors,SetErrors] = useState({})
const {genderError,birthDateError,weightError,heightError,trainingTypeError,trainingDaysError,trainingDurationError,trainingHoursError} = errors

const handleInput = (e) => {
    const newObj = {...values, [e.target.name] : e.target.value }
    SetValues(newObj)
}


const makeValidation = () => {
    const errors = {}
    
    if(gender.length === 0)   errors.genderError = "الجنس مطلوب"      
    if(gender.length !== 0) errors.genderError = ""       
 

    if(birthDate.length === 0) errors.birthDateError = "تاريخ الميلاد مطلوب"      
    if(birthDate.length !== 0) {
        const goodDate = /(19|20)\d{2}(\/|-)(0?[1-9]|1[1,2])(\/|-)(0?[1-9]|[12][0-9]|3[01])/gm
        if((!goodDate.test(birthDate)))  errors.birthDateError = "تاريخ الميلاد غير صحيح"       
        if(goodDate.test(birthDate))  errors.birthDateError =  ""
    }


    if(weight.length === 0)  errors.weightError = "الوزن  مطلوب"         
    if (weight.length !== 0 && weight < 30)  errors.weightError = "الوزن غير صحيح" 
    if(weight.length !== 0 && weight > 30)  errors.weightError = ""  


    if(height.length === 0)  errors.heightError = "الطول  مطلوب" 
    if(height.length !== 0 && height < 30) errors.heightError =  "الطول غير صحيح" 
    if(height.length !== 0 && height > 30) errors.heightError =  ""

    if(trainingType.length === 0) errors.trainingTypeError =   "اختر هدفك من التمارين"    
    if(trainingType.length !== 0)  errors.trainingTypeError =   ""  

    if(trainingDays) {
    const checked = trainingDays.some((day) => day.isChecked)
    if(!checked) errors.trainingDaysError = "اختر عدد ايام التدريب"
    if(checked)  errors.trainingDaysError =   ""
    }
 
    if(trainingDuration.length === 0) errors.trainingDurationError = "اختر مدة التدريب"
    if(trainingDuration.length !== 0) errors.trainingDurationError =  ""
    
    if(trainingHours.length === 0) errors.trainingHoursError =   "حدد وقت البدء"
    if(trainingHours.length !== 0) errors.trainingHoursError = "" 
    
    return errors
}

    const genderTypesArr = [
        { iconSrc: genderFemale, value: "2", text: "انثى" },
        { iconSrc: genderMale, value: "1", text: "ذكر" },
    ]

    const trainingTypesArr = [
        { iconSrc: trainingTypeWeightLoss, value: '1', text: "فقدان الوزن" },
        { iconSrc: trainingTypeBodyAdjustment, value: '2', text: "التنغيم" },
        { iconSrc: trainingTypeStrength, value: '3', text: "يستكثر" },
    ]

    const trainingDurationArr = [
        { text: '30 - 45', value : "1" },
        { text: '30 - 25', value : "2" },
        { text: '10 - 15', value : "3" },
    ]


    const handleSelectedTrainingDays = (selectedDay) => {
        
        const cpoiedTrainingDays = structuredClone(values.trainingDays)
        
        cpoiedTrainingDays.map((day) => day.dayNum === selectedDay.dayNum ? day.isChecked = !day.isChecked : "")

        SetValues((prev) => ({...prev, trainingDays : cpoiedTrainingDays}))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        
        const validationValue =  makeValidation()

        SetErrors(() => validationValue)

        const {genderError,birthDateError,weightError,heightError,trainingTypeError,trainingDaysError,trainingDurationError,trainingHoursError} = validationValue
       
        const isAllDataSuccess = [genderError,weightError,heightError,trainingTypeError,trainingDaysError,trainingDurationError,trainingHoursError].every((e) => e === "")
        
        // console.log(isAllDataSuccess,birthDateError)

        if(!isAllDataSuccess) setIsAllInputsFailed(true)

        if(isAllDataSuccess) {

            const params = {
                msisdn : userPhoneNumber,
                gender,
                height,
                weight,
                birth_date : birthDate,
                exercise_goals : trainingType,
                exercise_days : trainingDays.filter(day => day.isChecked === true).map(day => day.dayName),
                exercise_interval : trainingDuration,
                starting_time : `${trainingHours}:00`,
            }
    
            mutate(params)        
        }
        
    }


    return (
        <div className={styles['personal-workout']}>
            <div>

             {!isSuccess && <div className={styles['form']}>

                    <h5 >{"حدد المعلومات الخاصة بك من فضلك"}</h5>

                    <form>

                        <div className={styles['gender-input']}>
                            {genderTypesArr.map(genderType => (
                                <label key={genderType.value}>
                                    <input
                                        type="radio"
                                        value={genderType.value}
                                        checked={values.gender === genderType.value}
                                        name={"gender"}
                                        onChange={(e) => handleInput(e)}
                                    />
                                    <img src={genderType.iconSrc} alt={genderType.value} />
                                    {genderType.text}
                                </label>
                            ))}
                        </div>
            { genderError && <span className={styles["failed"]}>{genderError}</span> }

                        <label className={styles['date-input']}>
                            {"عيد ميلاد"}
                            <input
                                type='date'
                                name={"birthDate"}
                                onChange={(e) => handleInput(e)}
                            />
                        </label>
                       { birthDateError && <span className={styles["failed"]}>{birthDateError}</span> }

                        <label className={styles['weight-input']}>
                            {"أدخل الوزن"}
                            <input
                                type='text'
                                maxLength={3}
                                placeholder="Ex: 67 Kg"
                                name={"weight"}
                                onChange={(e) => handleInput(e)}

                            />
                        </label>
                        { weightError && <span className={styles["failed"]}>{weightError}</span> }

                        <label className={styles['height-input']}>
                            {"أدخل طولك"}
                            <input
                                type='text'
                                maxLength={3}
                                placeholder="Ex: 178 cm"
                                name={"height"}
                                onChange={(e) => handleInput(e)}

                            />
                        </label>
                        { heightError && <span className={styles["failed"]}>{heightError}</span> }

                        <div className={styles['training-type-input']}>
                            <h5>{"حدد المعلومات الخاصة بك من فضلك"}</h5>
                            <div>
                                {trainingTypesArr.map(type => (

                                    <label key={type.value}>
                                        <input
                                            type="radio"
                                            value={type.value}
                                            checked={values.trainingType === type.value}
                                            name={"trainingType"}
                                            onChange={(e) => handleInput(e)}
                                        />
                                        <img src={type.iconSrc} alt={type.value} />
                                        {type.text}
                                    </label>
                                ))}
                            </div>
                        </div>
                        {trainingTypeError && <span className={styles["failed"]}>{trainingTypeError}</span> }


                        <div className={styles['training-days-input']}>
                            <h5>{"حدد عدد أيام التدريب"}</h5>
                            <div>
                                {values.trainingDays.map(day => (
                                    <label key={day.dayNum}>
                                        <input
                                            type="checkbox"
                                            value={day.dayName}
                                            onChange={() => handleSelectedTrainingDays(day)}
                                        />
                                        <span>{day.dayName}</span>
                                        <span>{day.dayNum}</span>
                                    </label>
                                ))}

                            </div>
                        </div>
                {trainingDaysError && <span className={styles["failed"]}>{trainingDaysError}</span> }

                        <div className={styles['training-duration-input']}>
                            <h5>{"حدد مدة التدريب"}</h5>
                            <div>
                                {trainingDurationArr.map(time => (
                                    <label key={time.value}>
                                        <input
                                            type="radio"
                                            value={time.value}
                                            checked={values.trainingDuration === time.value}
                                            name={"trainingDuration"}
                                            onChange={(e) => handleInput(e)}
                                        />
                                        <img src={clockIcon} alt={'clock icon'} />
                                        {`${time.text} دقيقة`}
                                    </label>
                                ))}
                            </div>
                        </div>
                {trainingDurationError && <span className={styles["failed"]}>{trainingDurationError}</span> }
                        <div className={styles['time-input-wrapper']}>
                            <span> {"حدد وقت البدء"} </span>
                            <label className={styles['time-input']}>
                                <input
                                    type='time'
                                    name={"trainingHours"}
                                    onChange={(e) => handleInput(e)}
                                />
                            </label>
                        </div>
                        {trainingHoursError && <span className={styles["failed"]}>{trainingHoursError}</span> }
                <button onClick={(e) => handleOnSubmit(e)} className={styles['confirm-btn']}>
                         إضافة معلومات التغذية
                 </button>
            {isAllInputsFailed && <div className={styles['error-msg']}>من فضلك اكمل إدخال البيانات !</div>}

                    </form>

                </div>}


                {isSuccess && <h4 className={styles["success"]}>تم  إرسال البيانات بنجاح ✔😃</h4>}

                <div className={styles['banner']}>
                    <img src={personalWorkoutBanner} alt="Workout Image" />
                </div>

            </div >


        </div >
    )
}

export default PersonalWorkout 
