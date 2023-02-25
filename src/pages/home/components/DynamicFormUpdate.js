import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Searchbox } from "src/components/searchbox";
import { getNewsfeedAction } from "src/redux/thunks/homeThunk";
import { MdOutlineModeEdit, } from "react-icons/md";
import { TabAccordion } from "src/components/TabAccordion";
import CommonTabComponent from "src/components/schema/CommonTabComponent";
import { getProductTemplateSchemaAction, getSpecificIdInfoAction } from "src/redux/thunks/homeThunk";
import _ from 'lodash'


const DynamicFormUpdate = () => {
  const [search, changeSearch] = useState("");
  const dispatch = useDispatch();
  const homeState = useSelector(state => state.home)
  const { newsFeedList, } = homeState



  useEffect(() => {
    dispatch(getProductTemplateSchemaAction())
  }, [])


  const getSpecificProductData = async () => {
    try {
      const formData = await dispatch(getSpecificIdInfoAction()).unwrap()
    } catch (error) {

    }
  }



  const selectedSchemaFlatten = _.get(homeState, 'selectedProductSchema.productFlattenSchema', [])


  const onChangeSearch = (e) => {
    let value = e.target.value;

    changeSearch(value);
  };



  return (
    <>
      <CommonTabComponent
        isUpdate={true}
      />
    </>
  );
};
export default DynamicFormUpdate;
