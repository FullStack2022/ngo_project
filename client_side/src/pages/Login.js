import { useEffect, useState } from 'react';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ADMIN_LOGIN} from '../config/Constants';
import { useNavigate}  from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate();

  // check admin is login
  useEffect(() => {
    if(localStorage.getItem('admin_token_id')){
      navigation("/dashboard");
    }
  }, []);

  const loginAdmin = async (props) => {
    setIsLoading(true);
    let errorMessage = "";
    if(username == ""){
      errorMessage = "Please Enter Username";
    } else if(password == "")
    {
      errorMessage = "Please Enter Password";
    } else{

      const requestOption = {
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify({username : username, password: password})
      };
     
      const response = await fetch(ADMIN_LOGIN, requestOption);
      const result = await response.json();
      // console.log(result.result.status);
      if(result.result.status == 200){
        const response_data = result.result;
        const token = response_data.data;
        localStorage.setItem('admin_token_id', token);
        navigation("/dashboard");
      } else{
        errorMessage = result.result.message;
      }

      setIsLoading(false);
    }

    // show error message
    if(errorMessage != ""){
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  }

    return(
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>My Title</title>
          <meta name='title' content='Ngo Product Login Page' />
          <meta name='description' content='Ngo Product Login Page' />
          <link rel="canonical" href="http://localhost:3000/" />
      </Helmet>
        <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth">
          <div className="row flex-grow">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left p-5">
                <div className="brand-logo">
                  <img src="assets/images/logo.svg" />
                </div>
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <form className="pt-3" method="POST">
                  <div className="form-group">
                    <input type="email" 
                    className="form-control form-control-lg" 
                    id="exampleInputEmail1" 
                    placeholder="Username"
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input type="password" 
                    className="form-control form-control-lg" 
                    id="exampleInputPassword1" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <button type="button" onClick={() => loginAdmin()} className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn">{isLoading ? 'Loading...' : 'SIGN IN'}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      </>
    );
}

export default Login;