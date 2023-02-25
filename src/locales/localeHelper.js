import i18n from 'i18next';
import i18nObj from "./i18n"

export const handleChangLanguage = (lang) => {
    return i18n.changeLanguage(lang);
}

export const t = (key) => {
    // console.log("i18 object..",i18nObj)
    // modals.usersettings.toast_text_settings
    const getLocalMessage = (localMessageJson) => {
        let nestingSequenceArray = key.split(".")
        if (!nestingSequenceArray[nestingSequenceArray.length - 1]) {
            nestingSequenceArray.pop()
        }
        let keyName
        let localMessage = localMessageJson
        nestingSequenceArray.map((item) => {
            keyName = item
            localMessage = localMessage[item]
        })
        let messageObj
        if (localMessage) {
            // if value of key get
            messageObj = { localMessage: localMessage, keynameIsMessage: false }
        }
        else {
            // if value of key not get the return keyname as message
            messageObj = { localMessage: keyName, keynameIsMessage: true }
        }
        return messageObj
    }


    try {
        let localMessageJson
        if (i18n.language !== "en") {
            localMessageJson = i18nObj.options.resources[i18n.language].translation;
            let messageObject = getLocalMessage(localMessageJson)
            if (messageObject.keynameIsMessage === false) { // got keys value
                return messageObject.localMessage
            }
        }

        // Fallback language message
        localMessageJson = i18nObj.options.resources.en.translation;
        let messageObject = getLocalMessage(localMessageJson)
        return messageObject.localMessage
    } catch (error) {
        return key
    }
}