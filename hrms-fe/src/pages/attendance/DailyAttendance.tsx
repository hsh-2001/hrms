import { useTranslation } from "react-i18next";

const DailyAttendancePage = () => {
    const { t } = useTranslation();

    return (
        <div>{t('welcome')}</div>
    )
}

export default DailyAttendancePage;
