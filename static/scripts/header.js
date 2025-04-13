import {renderHeader} from "./views/headerView.js";
import {popupEvents} from "./controllers/popupContro.js"
import {userAuthEvents} from "./controllers/userContro.js"
import {checkSignInStatus} from "./controllers/authContro.js"
import {JumpToBooking} from "./controllers/bookingContro.js"

export function initHeader() {
    renderHeader();
    popupEvents();
    userAuthEvents();
    checkSignInStatus();
    JumpToBooking();
}
