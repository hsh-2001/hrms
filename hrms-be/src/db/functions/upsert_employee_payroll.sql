
DROP FUNCTION IF EXISTS upsert_employee_payroll(INT, UUID, DECIMAL(10, 2), VARCHAR(50), VARCHAR(10), DATE);

CREATE FUNCTION upsert_employee_payroll(
    p_company_id INT,
    p_employee_id UUID,
    p_salary DECIMAL(10, 2),
    p_payment_type VARCHAR(50),
    p_currency VARCHAR(10),
    p_effective_date DATE
)
RETURNS TABLE (
    status_code INT,
    message TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM employee_salary WHERE company_id = p_company_id AND employee_id = p_employee_id) THEN
        UPDATE employee_salary
        SET salary = p_salary,
            payment_type = p_payment_type,
            currency = p_currency,
            effective_date = p_effective_date,
            updated_at = CURRENT_TIMESTAMP
        WHERE company_id = p_company_id AND employee_id = p_employee_id; 
        RETURN QUERY SELECT 200 AS status_code, 'payroll updated successfully'::TEXT AS message;
    ELSE
        INSERT INTO employee_salary (company_id, employee_id, salary, payment_type, currency, effective_date)
        VALUES (p_company_id, p_employee_id, p_salary, p_payment_type, p_currency, p_effective_date);
        RETURN QUERY SELECT 201 AS status_code, 'payroll created successfully'::TEXT AS message;
    END IF;
END;
$$;