import {renderHeader} from "./views/headerView.js";
import {popupEvents} from "./controllers/popupContro.js"
import {userContro} from "./controllers/userContro.js"
import {checkSignInStatus} from "./controllers/authContro.js"
import {JumpToBooking} from "./controllers/bookingContro.js"

export function initHeader() {
    renderHeader();
    popupEvents();
    userContro();
    checkSignInStatus();
    JumpToBooking();
}
