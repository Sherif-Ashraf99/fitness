import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "src/layouts/Twist";
import NotFound from "src/pages/NotFound";
import FitnessHomePage from "src/pages/Fitness/Home";
import FitnessAskAliPage from "src/pages/Fitness/AskAliPage";
import PersonalWorkout from "src/components/Fitness/PersonalWorkout";
import PersonalNutrition from "src/components/Fitness/PersonalNutrition";
import MusclesWorkoutPage from "src/pages/Fitness/MusclesWorkoutPage";
import HomeWorkoutPage from "src/pages/Fitness/HomeWorkoutPage";
import GymWorkoutPage from "src/pages/Fitness/GymWorkoutPage";
import AliTipsPage from "src/pages/Fitness/AliTipsPage";
import FavoritesPage from "src/pages/Fitness/FavoritesPage";
import MediaDetailsPage from "src/pages/Fitness/MediaDetailsPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<Layout />}>
        {/* Fitness Pages */}
        <Route index element={<FitnessHomePage />} />
        <Route path="fitness/home" element={<Navigate to="/fitness" />} />
        <Route path="fitness/ask-mazhar/:tab" element={<FitnessAskAliPage />} />
        <Route path="fitness/personal-workout" element={<PersonalWorkout />} />
        <Route
          path="fitness/personal-nutrition"
          element={<PersonalNutrition />}
        />
        <Route
          path="fitness/muscles-workout"
          element={<MusclesWorkoutPage />}
        />
        <Route path="fitness/gym-workout" element={<GymWorkoutPage />} />
        <Route path="fitness/home-workout" element={<HomeWorkoutPage />} />
        <Route path="fitness/ali-tips" element={<AliTipsPage />} />
        <Route path="fitness/favorites" element={<FavoritesPage />} />
        <Route path="fitness/media/:type/:id" element={<MediaDetailsPage />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Route>
  )
);

export default router;
