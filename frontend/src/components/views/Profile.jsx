import { useAuth0 } from "@auth0/auth0-react";


function Profile() {

    let {user} = useAuth0();


    return (
      <div>

        <p>Nickname: {user.nickname}</p>
        <p>Email: {user.email}</p>
        <img src={user.picture} alt={user.name} />
        
      </div>
    );
  }
  
  export default Profile;