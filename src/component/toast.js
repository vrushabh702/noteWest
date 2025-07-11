import ReactDOM from 'react-dom'
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toastify = ({autoClose,...rest}) => {
    return ReactDOM.createPortal(
          <ToastContainer
            position="bottom-right"
            autoClose={autoClose ?? 3000}
            hideProgressBar
            transition={Zoom}
            newestOnTop={false}
            theme="colored"
            closeOnClick
            rtl={false}
            closeButton={false}
            pauseOnFocusLoss
            {...rest}
          />,
          document.getElementById("toastify-container")
        )
}

export default Toastify;