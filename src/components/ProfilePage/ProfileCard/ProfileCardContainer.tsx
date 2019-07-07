import * as React from 'react';
import {connect} from "react-redux";
import ProfileCard from "./ProfileCard";
import {
    onAboutMeChange, onContactChange, onFullNameChange, onJobDescriptionChange,
    putProfileInfo, getProfileInfo, setEditModeStatus, setPhotoUpdateErrorMessage,
    setLookingForAJobStatus, uploadPhoto, updateStatus
} from '../../../redux/profilePageReducer';
import {getAuthReducer, getProfilePageReducer} from '../../../redux/selectors';


const ProfileCardConnected = (props: any) => {
    return <ProfileCard profilePage={props.profilePage}
                        auth={props.auth}
                        getProfileInfo={props.getProfileInfo}
                        putProfileInfo={props.putProfileInfo}
                        setEditModeStatus={props.setEditModeStatus}
                        onContactChange={props.onContactChange}
                        onAboutMeChange={props.onAboutMeChange}
                        onFullNameChange={props.onFullNameChange}
                        setLookingForAJobStatus={props.setLookingForAJobStatus}
                        onJobDescriptionChange={props.onJobDescriptionChange}
                        uploadPhoto={props.uploadPhoto}
                        updateStatus={props.updateStatus}
                        setErrorMessage={props.setErrorMessage}
    />
};

const mapStateToProps = (state: any) => {
    return {
        profilePage: getProfilePageReducer(state),
        auth: getAuthReducer(state),

    }
};

const ProfileCardContainer = connect(mapStateToProps, {
    getProfileInfo, putProfileInfo, setEditModeStatus, onContactChange, onAboutMeChange, updateStatus,
    onFullNameChange, setLookingForAJobStatus, onJobDescriptionChange, uploadPhoto, setErrorMessage: setPhotoUpdateErrorMessage
})(ProfileCardConnected);

export default ProfileCardContainer;