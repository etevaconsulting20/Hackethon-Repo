import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Searchbox } from "src/components/searchbox";
import { getNewsfeedAction } from "src/redux/thunks/homeThunk";
import { MdOutlineModeEdit, } from "react-icons/md";
import { TabAccordion } from "src/components/TabAccordion";


const HomeList = () => {
  const [search, changeSearch] = useState("");
  const dispatch = useDispatch();
  const homeState = useSelector(state => state.home)
  const { newsFeedList } = homeState

  useEffect(() => {
    dispatch(getNewsfeedAction({ language: "en" }))
  }, [])


  const onChangeSearch = (e) => {
    let value = e.target.value;

    changeSearch(value);
  };


  const accordionNewsFeedList = newsFeedList && newsFeedList.map((item, index) => {
    const object = {
      title: (
        <span>
          {/* <MdOutlineModeEdit style={{ fontSize: "1.2rem", marginRight: "1rem" }} /> */}
          {item.title}
        </span>
      ),
      tabs: () => (
        <div key={index} className="mt-2">
          <div>

          </div>
          <div dangerouslySetInnerHTML={{ __html: item.content }} />
        </div>
      )
    }

    return object
  })



  return (
    <>
      <div
        className={`p-2 container-fluid d-flex flex-row justify-content-between bg-primary text-white`}
      >
        <h4>News and announcements</h4>
        {/* <div className="w-20">
          <Searchbox
            value={search}
            onChange={onChangeSearch}
            placeholder={"Search on home"}
          />
        </div>
      </div>
      <div>
        {accordionNewsFeedList && accordionNewsFeedList[0] &&
          <>
            <TabAccordion accordionData={accordionNewsFeedList}></TabAccordion>
          </>
        } */}

      </div>
    </>
  );
};
export default HomeList;
