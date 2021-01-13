// import the library
import { library } from '@fortawesome/fontawesome-svg-core';

// import your icons
import { faThumbsUp as regularThumbsUp} from "@fortawesome/free-regular-svg-icons";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons";

export default library.add(
    faThumbsUp,
    regularThumbsUp
);