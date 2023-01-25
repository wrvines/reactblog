import React from "react";
import { useParams } from "react-router-dom";
import { db } from "../../config/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import "./ArticleDetails.css";
import Likes from "../../components/Likes/Likes";

function ArticleDetails() {
  //need the articleId from url
  const { articleId } = useParams();
  console.log(articleId);

  //create state to store article info
  const [article, setArticle] = React.useState("");

  React.useEffect(() => {
    //get reference to this specific doc
    const docRef = doc(db, "articles", articleId);
    //get data
    getDoc(docRef)
      .then((res) => {
        console.log(res.data());
        setArticle(res.data());
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="details-container">
      <h1>{article?.title}</h1>
      <h2>{article?.summary}</h2>
      <div className="details-info-container">
        <p>Category: {article?.category}</p>
        <p>
          <span className="article-span">Author:</span>
          {article?.createdBy?.toUpperCase()}
        </p>
        <p>
          <span className="article-span published">Published:</span>
          {article?.createdAt?.toDate().toDateString()}
          <Likes articleId={articleId} />
        </p>
      </div>
      <div className="details-content">
        <img className="details-img" src={article?.imageUrl} alt="" />
        <p className="article-description">{article?.paragraphOne}</p>
        <p className="article-description">{article?.paragraphTwo}</p>
        <p className="article-description">{article?.paragraphThree}</p>
      </div>
    </div>
  );
}

export default ArticleDetails;
