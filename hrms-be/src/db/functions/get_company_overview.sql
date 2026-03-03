CREATE OR REPLACE FUNCTION public.get_company_overview(
    p_company_id INT
)
RETURNS TABLE (
    total_employees INT,
    total_departments INT,
    total_positions INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        (SELECT COUNT(*)::INT FROM public.employees WHERE company_id = p_company_id),
        (SELECT COUNT(*)::INT FROM public.departments WHERE company_id IN (p_company_id, 0)),
        (SELECT COUNT(*)::INT FROM public.positions WHERE company_id  IN (p_company_id, 0));
END;
$$;