import { useSelector } from 'react-redux'
import { Navigate} from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const {loading,isauthenticated}=useSelector((state)=>state.user);

    if(!loading){

        if(!isauthenticated){

            return <Navigate to="/login"  />;
        }

        return children
    }
}

export default ProtectedRoute