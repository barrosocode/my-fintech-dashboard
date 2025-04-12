// Imports
import {Card, CardContent, CardHeader} from "@mui/material";
import "../index.css";

// Component
const StyledCard = ({cardTitle, content}: {cardTitle: string; content: any}) => {
    return (
        <Card className="card">
            <CardHeader title={cardTitle} className="card-header" />
            <CardContent>{content}</CardContent>
        </Card>
    );
};

// Export
export default StyledCard;
