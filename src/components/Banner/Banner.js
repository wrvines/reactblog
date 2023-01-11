import React from "react";
import "./Banner.css";
import { db } from "../../config/firebaseConfig";
import { getDocs, collection, query, orderBy, limit } from "firebase/firestore";

function Banner() {
  //get data from articles collection to display when Banner loads

  const [mainArticle, setMainArticle] = React.useState({});
  const [otherArticles, setOtherArticles] = React.useState([]);

  React.useEffect(() => {
    //create a reference to articles collection
    const articleRef = collection(db, "articles");

    //set up a query to filter data
    const q = query(articleRef, orderBy("createdAt", "desc"), limit(5));

    //get documents form this collection
    //getDocs(articleRef)
    //use the query to get data

    getDocs(q, articleRef)
      .then((res) => {
        console.log(res.docs[0].data());
        //get data and store in array
        const articles = res.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));
        console.log(articles);
        setMainArticle(articles[0]);
        setOtherArticles(articles.splice(1));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="banner-container">
      <div
        className="main-article-container"
        style={{ backgroundImage: `url(${mainArticle?.imageUrl})` }}
      >
        <div className="banner-info">
          <h2>{mainArticle?.title}</h2>
          <div className="main-article-info">
            <p>{mainArticle?.createdAt?.toDate().toDateString()}</p>
          </div>
        </div>
      </div>

      <div className="other-articles-container">
        {otherArticles.map((item) => (
          <div
            className="other-article-container"
            style={{ backgroundImage: `url(${item?.imageUrl})` }}
          >
            <div className="banner-info">
              <h3>{item?.title}</h3>
              <small>{item?.createdAt?.toDate().toDateString()}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Banner;
