import PrimaryButton from "../../components/shares/button/PrimaryButton";
import MyInput from "../../components/shares/input/MyInput";
import useAuthentication from "../../hooks/useAuthentication";
import useDevice from "../../hooks/useDevice";

export default function Login() {
  const { loginModel, setLoginModel, handleSubmit, isLogin, setIsLogin,
    registerModel, setRegisterModel
   } = useAuthentication();

   const { isMobile } = useDevice();

  const onToggle = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div className="flex w-full justify-center h-screen items-center">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className={`grid gap-2 w-100 bg-gray-50 p-4 rounded-md ${isMobile ? "w-[90%] mx-4" : "w-100"}`}
      >
        <div className="text-center">
          <span className="text-2xl">{isLogin ? "Login" : "Register"}</span>
        </div>
        {isLogin ? (
          <>
            <MyInput
              id="username"
              labelWidth="min-w-24"
              required
              value={loginModel.username}
              onChange={(e) =>
                setLoginModel({ ...loginModel, username: e.target.value })
              }
            />
            <MyInput
              id="password"
              labelWidth="min-w-24"
              type="password"
              required
              value={loginModel.password}
              onChange={(e) =>
                setLoginModel({ ...loginModel, password: e.target.value })
              }
            />
          </>
        ) : (
          <>
            <MyInput
              id="username"
              labelWidth="min-w-24"
              required
              value={registerModel.username}
              onChange={(e) =>
                setRegisterModel({ ...registerModel, username: e.target.value })
              }
            />
            <MyInput
              id="password"
              labelWidth="min-w-24"
              type="password"
              required
              value={registerModel.password}
              onChange={(e) =>
                setRegisterModel({ ...registerModel, password: e.target.value })
              }
            />
              <MyInput
              id="confirmPassword"
              labelWidth="min-w-24"
              type="password"
              required
              value={registerModel.confirmPassword}
              onChange={(e) =>
                setRegisterModel({ ...registerModel, confirmPassword: e.target.value })
              }
            />
            <MyInput
              id="email"
              labelWidth="min-w-24"
              type="email"
              required
              value={registerModel.email}
              onChange={(e) =>
                setRegisterModel({ ...registerModel, email: e.target.value })
              }
            />
            <MyInput
              id="phone"
              labelWidth="min-w-24"
              type="tel"
              required
              value={registerModel.phone}
              onChange={(e) =>
                setRegisterModel({ ...registerModel, phone: e.target.value })
              }
            />
          </>
        )}
        <div className="w-full flex justify-end">
          <PrimaryButton type="submit" />
        </div>
        <div className="flex justify-end text-[12px]">
          <span>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={onToggle}
              className="text-blue-500 cursor-pointer"
            >
              {isLogin ? "Register here" : "Login here"}
            </button>
          </span>
        </div>
      </form>
    </div>
  );
}
