import { useLocation, useNavigate } from "react-router";
import InfoButton from "../components/shares/button/InfoButton";
import PrimaryButton from "../components/shares/button/PrimaryButton";

export default function UnAuthorize() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="h-full p-4 md:p-6">
      <div className="w-full max-w-2xl mx-auto mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 text-center">
        <div className="text-5xl mb-3">🚫</div>
        <h1 className="text-2xl font-semibold text-gray-800">Access Denied</h1>
        <p className="text-gray-500 mt-2">
          You don't have permission to access this page.
        </p>
        <p className="text-sm text-gray-400 mt-1 break-all">
          Current path: {location.pathname}
        </p>

        <div className="flex items-center justify-center gap-3 mt-6">
          <InfoButton name="Go Back" onClick={() => navigate(-1)} />
          <PrimaryButton name="Go Home" onClick={() => navigate("/")} />
        </div>
      </div>
    </div>
  );
}
