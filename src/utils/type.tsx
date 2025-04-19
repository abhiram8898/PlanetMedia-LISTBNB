
export type TabType = "profile" | "profileUpdate" | "postAd" | "ads" | "Logout";

export interface TabButtonProps {
  tab: TabType;
  currentTab: TabType;
  onClick: () => void;
  children: React.ReactNode;
}


