import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { auth } from "../../config/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "../../config/firebaseConfig";
import {
  getDocs,
  collection,
  query,
  addDoc,
  doc,
  deleteDoc,
  where,
} from "firebase/firestore";
import "./Likes.css";

function Likes({ articleId }) {
  const [user] = useAuthState(auth);
  //   console.log("user data", user);

  //need state to know if liked
  const [isLiked, setIsLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState();

  React.useEffect(() => {
    //when page loads I need to find out did this user previously like this article
    //to initialize isLiked properly
    //need reference to likes
    const likesRef = collection(db, "likes");
    //make a query to see if there is a record with this userId and articleId
    const q = query(
      likesRef,
      where("articleId", "==", articleId),
      where("userId", "==", user && user?.uid)
    );
    //look for documents with this query
    getDocs(q, likesRef)
      .then((res) => {
        //is there a match
        console.log(res.size);
        //gives you number of matches
        if (res.size > 0) {
          setIsLiked(true);
        }
      })
      .catch((err) => console.log(err));

    //find out number of likes
    //make a query to count records with this articleId
    const q2 = query(likesRef, where("articleId", "==", articleId));
    getDocs(q2, likesRef).then((res) => {
      setLikeCount(res.size);
    });
  }, [user, isLiked]);

  const handleLike = () => {
    // console.log("like");
    //make sure a user is logged in
    if (user) {
      //create a reference to like collection
      //will create the collection the first time
      const likesRef = collection(db, "likes");
      //add a document with this userId and articleId
      addDoc(likesRef, { userId: user?.uid, articleId: articleId })
        .then((res) => {
          console.log(res);
          setIsLiked(true);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleUnlike = () => {
    console.log("unlike");
    if (user) {
      //need to find document with this articleId and userId
      //make a refence to the collection
      const likesRef = collection(db, "likes");
      //set up a query to find this one
      const q = query(
        likesRef,
        where("articleId", "==", articleId),
        where("userId", "==", user?.uid)
      );
      //look for documents with this query
      getDocs(q, likesRef)
        .then((res) => {
          //I need the id of this document
          //   console.log(res.docs[0].id);
          const likesId = res.docs[0].id;
          //now delete
          deleteDoc(doc(db, "likes", likesId)).then((res) => {
            setIsLiked(false);
          });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      {isLiked ? (
        <FaHeart onClick={handleUnlike} />
      ) : (
        <FaRegHeart onClick={handleLike} />
      )}

      <span className="like-icon">{likeCount}</span>
    </div>
  );
}

export default Likes;
