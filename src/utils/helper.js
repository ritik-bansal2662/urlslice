import { subDomainList } from "./constant"

// this will hepl the application to decide which router to use
export const getApps = () => {
    const subDomain = getSubDomin(window.location.hostname)

    const mainApp = subDomainList.find((app) => app.main);

    if(subDomain === "") return mainApp.app

    const apps = subDomainList.find((app) => app.subDomain === subDomain)

    return apps ? apps.app : mainApp.app

}

export const getSubDomin = (location) => {
    const locationParts = location.split(".")
    const isLocalhost = locationParts.slice(-1)[0] === "localhost";
    const sliceTill = isLocalhost ? -1 : -2
    return locationParts.slice(0, sliceTill).join("")
}