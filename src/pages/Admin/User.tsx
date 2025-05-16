import { useParams } from 'react-router-dom'

const User = () => {
    const {id} = useParams();
  return (
    <div>
        {id}
        <div>fetch all the tasks by idof that particular user </div>
        <div>/tasks/user/:userId</div>
    </div>
  )
}

export default User