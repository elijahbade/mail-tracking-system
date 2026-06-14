import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Grid, Card, Typography, Button, Avatar, Stack, Divider, Skeleton,
} from "@mui/material";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import SendIcon from "@mui/icons-material/Send";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchIcon from "@mui/icons-material/Search";

import axiosInstance from "../../api/axios";
import useAuth from "../../store/hooks/useAuth";

// Fetch the total count the table endpoint already returns (allMatchedWorkflowsCount)
const fetchCount = async (folder) => {
  try {
    const res = await axiosInstance().get(
      `workflow/table?folder=${folder}&page=0&rowsPerPage=1`
    );
    return res.data?.allMatchedWorkflowsCount ?? 0;
  } catch {
    return 0;
  }
};

const StatCard = ({ icon, label, value, accent, loading, onClick }) => (
  <Card
    onClick={onClick}
    sx={{
      p: 3, cursor: "pointer", height: "100%",
      display: "flex", alignItems: "center", gap: 2,
      transition: "transform .18s ease, box-shadow .18s ease",
      "&:hover": { transform: "translateY(-3px)", boxShadow: "0 16px 40px rgba(11,37,69,0.12)" },
    }}
  >
    <Avatar
      variant="rounded"
      sx={{ bgcolor: accent, color: "#fff", width: 52, height: 52, borderRadius: 3 }}
    >
      {icon}
    </Avatar>
    <Box>
      {loading ? (
        <Skeleton width={44} height={40} />
      ) : (
        <Typography variant="h4" sx={{ fontWeight: 700, color: "primary.main", lineHeight: 1.1 }}>
          {value}
        </Typography>
      )}
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
        {label}
      </Typography>
    </Box>
  </Card>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const authState = useAuth();
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({ all: 0, inbox: 0, "follow-up": 0, cc: 0 });

  useEffect(() => {
    let mounted = true;
    (async () => {
      const [all, inbox, followup, cc] = await Promise.all([
        fetchCount("all"), fetchCount("inbox"), fetchCount("follow-up"), fetchCount("cc"),
      ]);
      if (mounted) {
        setCounts({ all, inbox, "follow-up": followup, cc });
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const firstName = (authState?.user?.fullName || "there").split(" ")[0];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: "auto" }}>
      {/* ---------- Header ---------- */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="overline" sx={{ color: "secondary.dark", fontWeight: 700, letterSpacing: "0.2em" }}>
          Dashboard
        </Typography>
        <Typography variant="h3" sx={{ color: "primary.main", fontWeight: 600 }}>
          Welcome back, {firstName}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
          Here's an overview of your correspondence.
        </Typography>
      </Box>

      {/* ---------- Stat cards ---------- */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard icon={<AllInboxIcon />} label="Total Correspondence" value={counts.all}
            accent="#0B2545" loading={loading} onClick={() => navigate("/workflow/inbox")} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard icon={<MoveToInboxIcon />} label="Received (Inbox)" value={counts.inbox}
            accent="#1B6E5B" loading={loading} onClick={() => navigate("/workflow/inbox")} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard icon={<SendIcon />} label="Sent (Follow-up)" value={counts["follow-up"]}
            accent="#C8A24B" loading={loading} onClick={() => navigate("/workflow/follow-up")} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard icon={<ContentCopyIcon />} label="Carbon Copies (CC)" value={counts.cc}
            accent="#5B6472" loading={loading} onClick={() => navigate("/workflow/cc")} />
        </Grid>
      </Grid>

      {/* ---------- Quick actions ---------- */}
      <Card sx={{ mt: 4, p: 3 }}>
        <Typography variant="h6" sx={{ color: "primary.main", mb: 0.5 }}>
          Quick actions
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Jump straight into your most common tasks.
        </Typography>
        <Divider sx={{ mb: 2.5 }} />
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Button variant="contained" color="primary" size="large"
            startIcon={<AddCircleOutlineIcon />} onClick={() => navigate("/create-workflow")}>
            Register New Mail
          </Button>
          <Button variant="outlined" color="primary" size="large"
            startIcon={<MoveToInboxIcon />} onClick={() => navigate("/workflow/inbox")}>
            Open Inbox
          </Button>
          <Button variant="outlined" color="primary" size="large"
            startIcon={<SearchIcon />} onClick={() => navigate("/employees")}>
            Find Employees
          </Button>
        </Stack>
      </Card>
    </Box>
  );
};

export default Dashboard;
