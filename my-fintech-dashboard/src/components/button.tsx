// Import
import {Button} from "@mui/material";
import "../index.css";

// Tipagem das props
interface StyledButtonProps {
    text: string;
    onClick?: () => void; // onClick opcional
}

// Component
const StyledButton = ({text, onClick}: StyledButtonProps) => {
    return (
        <Button
            onClick={onClick}
            sx={{
                backgroundColor: "var(--color-tertiary)",
                color: "var(--color-secondary)",
                borderRadius: "2% ",
                "&:hover": {
                    backgroundColor: "#5a826e",
                },
            }}
            size="large"
            fullWidth
        >
            {text}
        </Button>
    );
};

// Export
export default StyledButton;
