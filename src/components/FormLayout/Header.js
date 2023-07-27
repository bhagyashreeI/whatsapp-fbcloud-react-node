import WhatsAppIcon from "@mui/icons-material/WhatsApp";
const FormHeader = ({ title }) => {
    return (
        <div className='title flex_middle'>
            <div style={{ marginRight: "0.5em" }}>
                <WhatsAppIcon />
            </div>
            <div>{title}</div>
        </div>
    )
}

export default FormHeader