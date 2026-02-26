import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useSettings from "../../hooks/useSettings";
import useDevice from "../../hooks/useDevice";
import MyInput from "../../components/shares/input/MyInput";
import MySelection from "../../components/shares/select/MySelection";
import PrimaryButton from "../../components/shares/button/PrimaryButton";
import { Building2, Clock, Briefcase, DollarSign, ChevronDown, ChevronUp } from "lucide-react";
import InfoButton from "../../components/shares/button/InfoButton";

const TIMEZONE_OPTIONS = [
  { value: "Asia/Phnom_Penh", label: "Asia/Phnom_Penh (UTC+7)" },
];

const CURRENCY_OPTIONS = [
  { value: "USD", label: "USD - US Dollar" },
  { value: "KHR", label: "KHR - Cambodian Riel" },
];

const MONTH_OPTIONS = Array.from({ length: 12 }, (_, i) => ({
  value: String(i + 1),
  label: new Date(2024, i).toLocaleString("default", { month: "long" }),
}));

const WORKING_DAYS_OPTIONS = Array.from({ length: 7 }, (_, i) => ({
  value: String(i + 1),
  label: `${i + 1} day${i > 0 ? "s" : ""}`,
}));

function SectionCard({ icon, title, children, defaultOpen = true }: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-100 rounded-[20px] overflow-hidden bg-white break-inside-avoid">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-black/2 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-[10px] bg-green-500/10 text-green-600">
            {icon}
          </div>
          <span className="text-gray-700 font-medium">{title}</span>
        </div>
        {isOpen
          ? <ChevronUp size={16} className="text-gray-400" />
          : <ChevronDown size={16} className="text-gray-400" />
        }
      </button>
      {isOpen && (
        <div className="p-4 pt-2 space-y-3">
          {children}
        </div>
      )}
    </div>
  );
}

function ToggleSwitch({ checked, onChange, label }: {
  checked: boolean;
  onChange: (val: boolean) => void;
  label: string;
}) {
  const { isMobile } = useDevice();
  return (
    <div className={`flex gap-2 ${isMobile ? "flex-col" : "flex-row items-center"}`}>
      <span className="min-w-32">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${checked ? "bg-green-500" : "bg-gray-300"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0"}`}
        />
      </button>
    </div>
  );
}

export default function Settings() {
  const { t } = useTranslation();
  const {
    getCompanySettings,
    updateCompanySettings,
    companySettingModel,
    handleInputChange,
    handleToggleChange,
    isLoading,
    isEditMode,
    setIsEditMode,
  } = useSettings();
  const { isMobile } = useDevice();

  useEffect(() => {
    getCompanySettings();
  }, []);

  const handleSubmit = async () => {
    await updateCompanySettings();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-3 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="w-full px-2">
        <div className="w-full p-4 bg-black/5 rounded-[20px] my-2 flex justify-between items-center">
          <span className="text-gray-800 text-lg">{t("Company Settings")}</span>
          {
            !isEditMode ?
              <InfoButton name="Edit" onClick={() => setIsEditMode(!isEditMode)} />
            :
              <div className="flex gap-2">
                <InfoButton name="Cancel" onClick={() => setIsEditMode(false)} />
                <PrimaryButton name="Save Setting" onClick={handleSubmit} type="submit" />
              </div>
          }
        </div>
      </div>

      {/* Form - 2 col desktop, 1 col mobile */}
      <form
        onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
        className={`px-2 pb-4 ${isMobile ? "flex flex-col gap-3" : "grid grid-cols-2 gap-4"}`}
      >
        {/* Company Information */}
        <SectionCard icon={<Building2 size={18} />} title={t("Company Information")}>
          <MyInput
            id="name"
            label={t("Company Name")}
            value={companySettingModel.name}
            disabled={!isEditMode}
            onChange={handleInputChange}
            required
          />
          <MyInput
            id="address"
            label={t("Address")}
            disabled={!isEditMode}
            value={companySettingModel.address}
            onChange={handleInputChange}
          />
          <MyInput
            id="email"
            label={t("Email")}
            disabled={!isEditMode}
            value={companySettingModel.email}
            onChange={handleInputChange}
            type="email"
            required
          />
          <MyInput
            id="phone"
            label={t("Phone")}
            disabled={!isEditMode}
            value={companySettingModel.phone}
            onChange={handleInputChange}
          />
        </SectionCard>

        {/* Financial Settings */}
        <SectionCard icon={<DollarSign size={18} />} title={t("Financial Settings")}>
          <MySelection
            id="currency_code"
            label={t("Currency")}
            disabled={!isEditMode}
            value={companySettingModel.currency_code}
            onChange={handleInputChange}
            options={CURRENCY_OPTIONS}
          />
          <MySelection
            id="fiscal_year_start_month"
            label={t("Fiscal Year Start Month")}
            disabled={!isEditMode}
            value={String(companySettingModel.fiscal_year_start_month)}
            onChange={handleInputChange}
            options={MONTH_OPTIONS}
          />
          <MySelection
            id="timezone"
            label={t("Timezone")}
            disabled={!isEditMode}
            value={companySettingModel.timezone}
            onChange={handleInputChange}
            options={TIMEZONE_OPTIONS}
          />
        </SectionCard>

        {/* Work Policy */}
        <SectionCard icon={<Briefcase size={18} />} title={t("Work Policy")}>
          <MySelection
            id="working_days_per_week"
            label={t("Working Days / Week")}
            disabled={!isEditMode}
            value={String(companySettingModel.working_days_per_week)}
            onChange={handleInputChange}
            options={WORKING_DAYS_OPTIONS}
          />
          <MyInput
            id="standard_work_hours_per_day"
            label={t("Standard Work Hours / Day")}
            disabled={!isEditMode}
            value={companySettingModel.standard_work_hours_per_day?.toString() ?? ""}
            onChange={handleInputChange}
            type="number"
          />
          <MyInput
            id="probation_period_days"
            label={t("Probation Period (Days)")}
            disabled={!isEditMode}
            value={String(companySettingModel.probation_period_days)}
            onChange={handleInputChange}
            type="number"
          />
          <ToggleSwitch
            label={t("Allow Overtime")}
            checked={companySettingModel.allow_overtime}
            onChange={(val) => handleToggleChange("allow_overtime", val)}
          />
          {companySettingModel.allow_overtime && (
            <MyInput
              id="overtime_rate"
              disabled={!isEditMode}
              label={t("Overtime Rate (x)")}
              value={String(companySettingModel.overtime_rate)}
              onChange={handleInputChange}
              type="number"
            />
          )}
        </SectionCard>

        <SectionCard icon={<Clock size={18} />} title={t("Working Shift")} defaultOpen={true}>
          <MyInput
            id="shift_name"
            label={t("Shift Name")}
            disabled={!isEditMode}
            value={companySettingModel.shift_name ?? ""}
            onChange={handleInputChange}
          />
          <MyInput
            id="start_time"
            label={t("Start Time")}
            disabled={!isEditMode}
            value={companySettingModel.start_time ?? ""}
            onChange={handleInputChange}
            type="time"
          />
          <MyInput
            id="end_time"
            label={t("End Time")}
            disabled={!isEditMode}
            value={companySettingModel.end_time ?? ""}
            onChange={handleInputChange}
            type="time"
          />
          <MyInput
            id="break_start"
            label={t("Break Start")}
            disabled={!isEditMode}
            value={companySettingModel.break_start ?? ""}
            onChange={handleInputChange}
            type="time"
          />
          <MyInput
            id="break_end"
            label={t("Break End")}
            disabled={!isEditMode}
            value={companySettingModel.break_end ?? ""}
            onChange={handleInputChange}
            type="time"
          />
        </SectionCard>
      </form>
    </div>
  );
}
