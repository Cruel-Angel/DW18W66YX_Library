import React from "react";
import NavbarRead from "./NavBarRead";
import { useParams } from "react-router-dom";
import DataBook from "../../Data/DataMyBook.json";
import { ReactReader } from "react-reader";

const ReadBook = () => {
  const { id } = useParams();
  const read = DataBook.filter((item) => item.id === parseInt(id));
  return (
    <div>
      <NavbarRead />
      <div style={{ position: "relative", height: "100vh" }}>
        <ReactReader
          url={require(`../../Data/Novel/${read[0].file_epub}`)}
          title={read[0].title}
          location={"epubcfi(/6/2[cover]!/6)"}
          locationChanged={(epubcifi) => console.log(epubcifi)}
        />
      </div>
    </div>
  );
};

export default ReadBook;
