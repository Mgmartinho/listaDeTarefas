import emptyImg from "../../assets/banerEmpty.svg";
import "./Empty.css"

interface IEmptyProps{
    title: string;
}

export default function Empty({title}: IEmptyProps){
    return(
        <div className="container-empty">
            <img src={emptyImg} alt="img" />
             <h3>{title}</h3>  {/*O titulo de Empty sera descrito na Importação do Empty em App.tsx*/}
          </div>
    )
}