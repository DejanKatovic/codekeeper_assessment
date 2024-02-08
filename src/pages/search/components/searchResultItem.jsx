import React, { useRef, useState, useEffect } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const SearchResultItem = ({ item }) => {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(false);

  const { title, nasa_id, location } = item.data[0];
  const { href } = item.links[0];
  const { photographer, secondary_creator } = item;

  useEffect(() => {
    const titleNode = titleRef.current;
    if (titleNode) {
      setIsTruncated(titleNode.offsetWidth < titleNode.scrollWidth);
    }
  }, [title]);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ height: "100%" }}>
        <CardActionArea onClick={() => navigate(`/show/${nasa_id}`)}>
          <Box
            component="img"
            src={href}
            alt={title}
            sx={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              aspectRatio: "1 / 1",
            }}
          />
          <CardContent>
            <Typography
              className="title"
              variant="h6"
              component="div"
              ref={titleRef}
              sx={{
                fontSize: { xs: 20, md: 22, lg: 24 },
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                "&:hover": isTruncated
                  ? {
                      overflow: "visible",
                      whiteSpace: "nowrap",
                      animation: "slide-text 4s linear forwards 0.5s",
                    }
                  : {},
                "@keyframes slide-text": {
                  "0%": { transform: "translateX(0%)" },
                  "99%": { transform: "translateX(-119%)" },
                  "100%": { transform: "translateX(-120%)" },
                },
              }}
            >
              {title || "-"}
            </Typography>
            <Typography color="text.secondary">
              Location : {location || "-"}
            </Typography>
            <Typography color="text.secondary">
              Photographer: {photographer || secondary_creator || "-"}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default SearchResultItem;
