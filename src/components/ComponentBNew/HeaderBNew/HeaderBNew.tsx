import Image from "next/image";
import headerPC from "../../../../public/BnewPC.png";
import headerMB from "../../../../public/BnewMB.png"
import "./HeaderBNew.scss"
export default function HeaderBNew() {
    return (
        <div>
            <Image src={headerPC} alt="" className="Bnew-Header-PC" />
            <Image src={headerMB} alt="" className="Bnew-Header-MB" />
        </div>
    );
}
