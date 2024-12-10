import styles from './index.module.css'
import MediaCard from 'src/components/Fitness/MediaCard'
import bodyHead from 'src/assets/images/Fitness/bodyHead.png'
import bodyShoulders from 'src/assets/images/Fitness/bodyShoulders.png'
import bodyArmsRight from 'src/assets/images/Fitness/bodyArmsRight.png'
import bodyArmsLeft from 'src/assets/images/Fitness/bodyArmsLeft.png'
import bodyChest from 'src/assets/images/Fitness/bodyChest.png'
import bodyCore from 'src/assets/images/Fitness/bodyCore.png'
import bodyLegs from 'src/assets/images/Fitness/bodyLegs.png'
import { useState } from 'react'
import { useCheckSubscriptionByService } from "src/utils/checkSubscriptionByService";
import SubscribeBtn from 'src/components/Shared/Subscription/SubscribeBtn';
import apis from 'src/services/Fitness'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom';
import { exerciseApiParams } from 'src/utils/Fitness/globalData';

const apiFn = (params) => apis.workout.getWorkout(params)

const MusclesWorkoutPage = () => {

    const [selectedMuscle, setSelectedMuscle] = useState(null)
    const { isSubscripedInTheServie, setRedirectToSubscriptionUI } = useCheckSubscriptionByService('fitness')
    if (!isSubscripedInTheServie) return <SubscribeBtn setRedirectToSubscriptionUI={setRedirectToSubscriptionUI} />

    const initialParams = {
        type: exerciseApiParams.workoutType.MUSCLE_WORKOUT,
        limit: 20,
        body_region: exerciseApiParams.mucsleName[selectedMuscle]
    }

    const { data, isLoading, isError, isFetching } = useQuery({
        queryKey: ["muscles-workout", selectedMuscle],
        queryFn: () => apiFn(initialParams),
    })


    const bodyMusclesNav = [
        { name: "SHOULDERS", text: "الاكتاف" },
        { name: "CHEST", text: "الصدر" },
        { name: "CORE", text: "البطن" },
        { name: "ARMS", text: "الذراع" },
        { name: "LEGS", text: "الساق" },
    ]

    const bodyMusclesImgs = [
        { name: "", src: bodyHead, className: "head" },
        { name: "shoulders", src: bodyShoulders, className: "shoulders" },
        { name: "arm", src: bodyArmsRight, className: "right-arm" },
        { name: "arm", src: bodyArmsLeft, className: "left-arm" },
        { name: "legs", src: bodyLegs, className: "legs" },
        { name: "core", src: bodyCore, className: "core" },
        { name: "chest", src: bodyChest, className: "chest" },
    ]


    const handleOnMuscleNavClick = (e) => {
        setSelectedMuscle(e.target.id)
    }

    const handleOnMuscleImgClick = (e) => {
        setSelectedMuscle(e.target.alt)
    }


    if (isLoading) return <div>Loading...</div>

    return (
        <div className={styles['muscles-workout']}>

            <h1>{"تمارين للعضلات"}</h1>



            <div>

                <div className={styles['content-section']}>
                    <ul>
                        {
                            bodyMusclesNav.map((muscle) => (
                                <li
                                    className={`${muscle.name == selectedMuscle && styles["active"]}`}
                                    key={muscle.name}
                                    onClick={(e) => handleOnMuscleNavClick(e)}
                                    id={muscle.name}
                                >
                                    {muscle.text}
                                </li>
                            ))
                        }
                    </ul>
                    {
                        data.map((item, i) => <div key={i}><MediaCard item={item} horizontal={true} isVideo={true} /></div>)
                    }
                </div>

                <div className={styles['body-section']}>
                    {
                        bodyMusclesImgs.map(muscle => (
                            <img
                                key={muscle.className}
                                onClick={(e) => handleOnMuscleImgClick(e)}
                                className={`${styles[muscle.className]} ${muscle.name == selectedMuscle && styles["active"]}`}
                                src={muscle.src}
                                alt={muscle.name}
                            />
                        ))
                    }
                </div>

            </div>

        </div>
    )
}

export default MusclesWorkoutPage