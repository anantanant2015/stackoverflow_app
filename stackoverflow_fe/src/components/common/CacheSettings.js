import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Switch, FormControlLabel, Box } from "@mui/material";

function CacheSettings({ sx }) {
  const [backendCache, setBackendCache] = useState(false);
  const [rerank, setRerank] = useState(false);

  useEffect(() => {
    setBackendCache(localStorage.getItem("backendCacheEnabled") === "true");
    setRerank(localStorage.getItem("rerankEnabled") === "true");
  }, []);

  const handleBackendCacheChange = (e) => {
    localStorage.setItem(
      "backendCacheEnabled",
      e.target.checked ? "true" : "false",
    );
    setBackendCache(e.target.checked);
  };

  const handleRerankChange = (e) => {
    localStorage.setItem("rerankEnabled", e.target.checked ? "true" : "false");
    setRerank(e.target.checked);
  };

  return (
    <Box sx={sx}>
      <FormControlLabel
        control={
          <Switch checked={backendCache} onChange={handleBackendCacheChange} />
        }
        label="Enable Backend Cache"
      />
      <FormControlLabel
        control={<Switch checked={rerank} onChange={handleRerankChange} />}
        label="Enable Rerank"
      />
    </Box>
  );
}

CacheSettings.propTypes = {
  sx: PropTypes.object,
};

export default CacheSettings;
