import { useNavigate } from "react-router-dom";
import { RxArrowLeft } from "react-icons/rx";

export default function Return() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleBack}
      className="flex justify-center items-center gap-0.5 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-xs font-medium w-20"
    >
      <RxArrowLeft />
      Back
    </button>
  );
}

