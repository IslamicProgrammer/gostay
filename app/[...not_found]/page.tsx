import { notFound } from "next/navigation";

const NotFoundCatchAll = () => {
    notFound();
    return null;
}
 
export default NotFoundCatchAll;