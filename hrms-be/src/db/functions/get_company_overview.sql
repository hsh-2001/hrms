CREATE OR REPLACE FUNCTION public.get_company_overview(
    p_company_id INT
)
RETURNS TABLE (
    total_employees INT,
    total_departments INT,
    total_positions INT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    SELECT
        (SELECT COUNT(*) FROM public.employees WHERE company_id = p_company_id),
        (SELECT COUNT(*) FROM public.departments WHERE company_id = p_company_id),
        (SELECT COUNT(*) FROM public.positions WHERE company_id = p_company_id);
END;
$$;