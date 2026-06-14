import { createTheme } from "@mui/material/styles";

/**
 * Global "Refined Institutional" theme for the Mail Tracking & Management System.
 * Deep navy + warm gold, a Fraunces serif display paired with an Outfit sans body.
 * Light theme, crisp cards, thin gold dividers, calm density.
 */

const NAVY = "#0B2545";
const NAVY_LIGHT = "#1B3A5B";
const NAVY_DARK = "#061A33";
const GOLD = "#C8A24B";
const GOLD_LIGHT = "#E0C27A";
const GOLD_DARK = "#A07F2E";
const CREAM = "#F6F4EF";
const INK = "#1A2330";
const MUTED = "#5B6472";
const DIVIDER = "#E6E2D8";

const serif = `'Fraunces', 'Libre Baskerville', Georgia, serif`;
const sans = `'Outfit', 'Source Sans 3', system-ui, sans-serif`;

const theme = createTheme({
    palette: {
        mode: "light",
        primary: { main: NAVY, light: NAVY_LIGHT, dark: NAVY_DARK, contrastText: "#FFFFFF" },
        secondary: { main: GOLD, light: GOLD_LIGHT, dark: GOLD_DARK, contrastText: NAVY_DARK },
        background: { default: CREAM, paper: "#FFFFFF" },
        text: { primary: INK, secondary: MUTED },
        divider: DIVIDER,
        success: { main: "#2E7D5B" },
        warning: { main: "#B5852A" },
        error: { main: "#B23A3A" },
        info: { main: NAVY_LIGHT },
    },
    shape: { borderRadius: 12 },
    typography: {
        fontFamily: sans,
        h1: { fontFamily: serif, fontWeight: 600, letterSpacing: "-0.02em" },
        h2: { fontFamily: serif, fontWeight: 600, letterSpacing: "-0.02em" },
        h3: { fontFamily: serif, fontWeight: 600, letterSpacing: "-0.01em" },
        h4: { fontFamily: serif, fontWeight: 600 },
        h5: { fontFamily: serif, fontWeight: 600 },
        h6: { fontFamily: serif, fontWeight: 600 },
        subtitle1: { fontWeight: 600 },
        button: { fontWeight: 600, textTransform: "none", letterSpacing: "0.01em" },
        overline: { fontWeight: 700, letterSpacing: "0.12em" },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: CREAM,
                    // subtle paper-grain atmosphere instead of a flat fill
                    backgroundImage:
                        "radial-gradient(circle at 12% 18%, rgba(200,162,75,0.06), transparent 38%)," +
                        "radial-gradient(circle at 88% 6%, rgba(11,37,69,0.05), transparent 42%)",
                    backgroundAttachment: "fixed",
                },
                "::selection": { background: GOLD_LIGHT, color: NAVY_DARK },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: NAVY,
                    backgroundImage: `linear-gradient(180deg, ${NAVY_LIGHT} 0%, ${NAVY} 100%)`,
                    borderBottom: `2px solid ${GOLD}`,
                    boxShadow: "0 4px 20px rgba(6,26,51,0.18)",
                },
            },
        },
        MuiButton: {
            defaultProps: { disableElevation: true },
            styleOverrides: {
                root: { borderRadius: 10, paddingInline: 18, paddingBlock: 8 },
                containedPrimary: {
                    boxShadow: "0 6px 16px rgba(11,37,69,0.22)",
                    "&:hover": { backgroundColor: NAVY_DARK },
                },
                outlinedPrimary: { borderWidth: 1.5, "&:hover": { borderWidth: 1.5 } },
            },
        },
        MuiPaper: {
            styleOverrides: {
                rounded: { borderRadius: 14 },
                outlined: { borderColor: DIVIDER },
            },
        },
        MuiCard: {
            defaultProps: { elevation: 0 },
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    border: `1px solid ${DIVIDER}`,
                    boxShadow: "0 10px 30px rgba(11,37,69,0.06)",
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: { backgroundColor: "#FBFAF6" },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    color: NAVY,
                    fontWeight: 700,
                    fontSize: "0.72rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    borderBottom: `2px solid ${GOLD_LIGHT}`,
                },
                root: { borderColor: DIVIDER },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: DIVIDER },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: GOLD },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: NAVY, borderWidth: 1.5 },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: { borderRadius: 8, fontWeight: 600 },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: { backgroundColor: NAVY_DARK, fontSize: "0.75rem", borderRadius: 8, padding: "6px 10px" },
                arrow: { color: NAVY_DARK },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: { transition: "background-color 0.15s ease" },
            },
        },
    },
});

export default theme;
