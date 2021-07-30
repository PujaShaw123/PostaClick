import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'


const Profile=()=>{
     const [userProfile,setProfile]=useState(null)
     const {state,dispatch}=useContext(UserContext)
     const {userid}=useParams()
     console.log(userid)
    
     useEffect(()=>{
          fetch(`/user/${userid}`,{
               headers:{
                    "Authorization" : "Bearer " + localStorage.getItem("jwt")
               }
                  
               }).then(res=>res.json())
               .then(result=>{
                   console.log(result)
                   setProfile(result)
          })
     },[]) 
return(
    <>
    {
        userProfile ? 

        <div style={{maxWidth:"550px",margin:"0px auto"}}>
        {/* This is for the upper half i.e image and name */}
       <div style=
       {{display:"flex",
        justifyContent:"space-around",
        margin:"18px 0px",
        borderBottom:"1px solid grey"
        }}>
           <div>
                <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                src={userProfile.user.pic}/>
           </div>
           <div >
                <h4>{userProfile.user.name}</h4>
                <h5>{userProfile.user.email}</h5>
                <div style={{display:"flex", justifyContent:"space-between",width:"108%"}}>
                    <h6>{userProfile.posts.length} posts</h6>
                    <h6>40 followers</h6>
                    <h6>40 following</h6>
                </div>
           </div>
       </div>
          
          {/* This is for the lower half i.e posts */}
        <div className="gallery">
             {
                  userProfile.posts.map(item=>{
                       return(
                         <img key={item._id} className="item"src={item.photo} alt={item.title}/>
                       )
                  })
             }
         
          
        </div> 
   </div>
        :<h2>loading...!</h2>
    }
   
   </>
)}

export default Profile;