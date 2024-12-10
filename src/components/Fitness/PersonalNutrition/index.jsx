import { useState } from 'react'
import styles from './index.module.css'
import personalNutritionBanner from 'src/assets/images/Fitness/personalNutritionBanner.png'
import { useQuery,useMutation } from '@tanstack/react-query'
import apis from 'src/services/Fitness'
import { getUserPhoneNumnberFromCookies } from 'src/utils/globalFn'
import { useCheckSubscriptionByService } from 'src/utils/checkSubscriptionByService'
import SubscribeBtn from 'src/components/Shared/Subscription/SubscribeBtn'

const apiFn = (params) => apis.Nutrition.addUserFoodSystem(params)
const getFoodFn = () => apis.Nutrition.getDisLikedFood()
const getMealsFn = () => apis.Nutrition.getMeals()

const PersonalNutrition = () => {
    const userPhoneNumber = getUserPhoneNumnberFromCookies("fitness")
    const { isSubscripedInTheServie, setRedirectToSubscriptionUI } = useCheckSubscriptionByService("fitness");

    if (!isSubscripedInTheServie)
      return (
        <SubscribeBtn setRedirectToSubscriptionUI={setRedirectToSubscriptionUI} />
      );  

   const {mutate,isSuccess} =  useMutation({
    mutationKey : ["Personal-Nutrition"],
    mutationFn : apiFn,
   })

   const {data ,isLoading} = useQuery({
    queryKey : ["disliked-Food"],
    queryFn : getFoodFn,
   })

   const {data : mealsData ,isLoading : isLoadingMeals} = useQuery({
    queryKey : ["get-Meals"],
    queryFn : getMealsFn,
   })
    
   const [isAllInputsField, setIsAllInputsField] = useState(false)
     
    const [values,setValues] = useState({
        nutritionType : "",
        ableToPrepareFood : "",
        numOfMealsPerDay : "",
        selectedDisLikedArr : [],
     })

     const {nutritionType,ableToPrepareFood,numOfMealsPerDay,selectedDisLikedArr} = values

     const [errors,setErrors] = useState({})

     const {nutritionTypeError,disLikedError,prepareFoodError,mealsPerDayError} = errors


    const nutritionSystemTypeArr = [
        { value:"1", text: "الاول" },
        { value: "2", text: "الثاني" },
        { value: "3", text: "الثالث" },
    ]

    const ableToPrepareFoodArr = [
        { value: "1", text: "نعم" },
        { value: "0", text: "لا" },
    ]

const handleInputs = (e) => {
    const newObj = {...values, [e.target.name] : e.target.value}
    setValues(newObj)
}
    
const handleSelectedDislikedFood = (selectedFood) => {
    
        if(selectedDisLikedArr.includes(selectedFood)) { 
            const includeFood =  selectedDisLikedArr.filter((food) => food !== selectedFood)
            return setValues( (prev) => ({...prev, selectedDisLikedArr : includeFood}))
        }
        setValues((prev) => ({...prev,selectedDisLikedArr : [...selectedDisLikedArr,selectedFood]}) )        
}

const makeValidation = () => {
        const errors = {}
        
        if(!nutritionType) errors.nutritionTypeError = "اختر النظام الغذائي"
        if(nutritionType) errors.nutritionTypeError = ""

        if(!selectedDisLikedArr.length) errors.disLikedError = "حدد الأطعمة غير المحبوبة"
        if(selectedDisLikedArr.length) errors.disLikedError = ""
        
        if(!ableToPrepareFood) errors.prepareFoodError = "مطلوب"
        if(ableToPrepareFood) errors.prepareFoodError = ""
        
        if(!numOfMealsPerDay) errors.mealsPerDayError = "مطلوب"
        if(numOfMealsPerDay) errors.mealsPerDayError = ""

    return errors
}
    

const handleOnSubmit = () => {
        
        const errors = makeValidation()
        const {nutritionTypeError,disLikedError,prepareFoodError,mealsPerDayError} = errors

        setErrors(errors)

        const isEmptyField = [nutritionTypeError,disLikedError,prepareFoodError,mealsPerDayError].includes("")

        if (!isEmptyField) {
            return  setIsAllInputsField(true)
        }

            const params = {
                msisdn : userPhoneNumber,
                foodSystem_type : nutritionType,
                disliked_foods : selectedDisLikedArr,
                preparing_food : ableToPrepareFood,
                fitnessMeal_id : numOfMealsPerDay,
            }
            mutate(params)
}
    
    
    return <>
        {!isLoading && !isLoadingMeals && <div className={styles['personal-nutrition']} >
            <div>

                {!isSuccess && <div className={styles['form']} >

                    <h5>{"نوع النظام الغذائي"}</h5>
                    <div className={styles['system-type-input']}>
                        {nutritionSystemTypeArr.map(type => (
                            <label key={type.value}>
                                <input
                                    type="radio"
                                    value={type.value}
                                    checked={nutritionType === type.value}
                                    name='nutritionType'
                                    onChange={(e) => handleInputs(e)}
                                />
                                {type.text}
                            </label>
                        ))}
                    </div>
                {nutritionTypeError && <span className={styles["failed"]}>{nutritionTypeError}</span>}
                    <h5>{"أنواع الأطعمة غير المحبوبة"}</h5>
                    <div className={styles['disliked-food-input']}>
                        {data?.map(food => (
                            <label key={food.id}>
                                <input
                                    type="checkbox"
                                    value={food.name}
                                    onChange={() => handleSelectedDislikedFood(food.name)}
                                />
                                <span>{food?.name}</span>
                            </label>
                        ))}
                    </div>
                    {disLikedError && <span className={styles["failed"]}>{disLikedError}</span>}

                    <h5>{"هل لديك الوقت لتحضير الطعام؟"}</h5>
                    <div className={styles['able-to-prepare-food-input']}>
                        {ableToPrepareFoodArr.map(type => (
                            <label key={type.value}>
                                <input
                                    type="radio"
                                    value={type.value}
                                    checked={ableToPrepareFood === type.value}
                                    name='ableToPrepareFood'
                                    onChange={(e) => handleInputs(e)}
                                />
                                {type.text}
                            </label>
                        ))}
                    </div>
                    {prepareFoodError && <span className={styles["failed"]}>{prepareFoodError}</span>}

                    <h5>{"كم عدد الوجبات التي تفضلها في اليوم؟"}</h5>
                    <div className={styles['meals-per-day-input']}>
                        {mealsData.map(type => (
                            <label key={type.id}>
                                <input
                                    type="radio"
                                    value={type.id}
                                    checked={+numOfMealsPerDay === type.id}
                                    name='numOfMealsPerDay'
                                    onChange={(e) => handleInputs(e)}
                                />
                                {type.name}
                            </label>
                        ))}
                    </div>
                    {mealsPerDayError && <span className={styles["failed"]}>{mealsPerDayError}</span>}

            <button onClick={handleOnSubmit} className={styles['confirm-btn']}>
                إضافة معلومات التغذية
            </button>

            {isAllInputsField && <div className={styles['error-msg']}>من فضلك اكمل إدخال البيانات !</div>}

                </div>}

                {isSuccess && <h4 className={styles["success"]}>تم  إرسال البيانات بنجاح ✔😃</h4>}

                <div className={styles['banner']} >
                    <img src={personalNutritionBanner} alt="Food image" />
                </div>

            </div>

           

        </div >
}
        </>
    
}

export default PersonalNutrition 
