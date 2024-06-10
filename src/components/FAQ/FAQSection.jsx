import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQSection = () => {
  return (
    <div className="flex flex-col items-center justify-between p-8 lg:flex-row lg:items-start lg:p-14">
      <div className="lg:w-1/2 me-10">
        <h2 className="mb-4 text-3xl font-bold lg:text-5xl">
          Any questions? We got you.
        </h2>
        <p className="mb-8 text-gray-500">
          Yet bed any for assistance indulgence unpleasing. Not thoughts all
          exercise blessing. Indulgence way everything joy alteration boisterous
          the attachment.
        </p>
        {/* <a href="#" className="text-blue-600">
          More FAQs &rarr;
        </a> */}
      </div>
      <div className="w-full mt-8 lg:w-1/2 lg:mt-0">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="font-semibold">How this work?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yet bed any for assistance indulgence unpleasing. Not thoughts all
              exercise blessing. Indulgence way everything joy alteration
              boisterous the attachment.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className="font-semibold">
              Are there any additional fee?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yet bed any for assistance indulgence unpleasing. Not thoughts all
              exercise blessing. Indulgence way everything joy alteration
              boisterous the attachment.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography className="font-semibold">
              How can I get the app?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yet bed any for assistance indulgence unpleasing. Not thoughts all
              exercise blessing. Indulgence way everything joy alteration
              boisterous the attachment.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4a-content"
            id="panel4a-header"
          >
            <Typography className="font-semibold">
              What features do you offer and other not?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yet bed any for assistance indulgence unpleasing. Not thoughts all
              exercise blessing. Indulgence way everything joy alteration
              boisterous the attachment.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQSection;
