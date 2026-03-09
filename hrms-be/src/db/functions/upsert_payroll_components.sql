DROP FUNCTION IF EXISTS upsert_payroll_components(INT, INT, VARCHAR(100), TEXT, VARCHAR(50), VARCHAR(50));

CREATE FUNCTION upsert_payroll_components(
    p_id INT,
    p_company_id INT,
    p_name VARCHAR(100),
    p_description TEXT,
    p_component_type VARCHAR(50),
    p_calculation_type VARCHAR(50)
)
RETURNS TABLE (
    status_code INT,
    message TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    component_count INT;

BEGIN   
    SELECT COUNT(1)
        INTO component_count
        FROM payroll_components 
        WHERE company_id = p_company_id;

    IF component_count >= 6 THEN
        RAISE EXCEPTION 'Maximum of 2 payroll components allowed per company';
        RETURN;
    END IF;

    IF EXISTS (SELECT 1 FROM payroll_components WHERE company_id = p_company_id AND id = p_id) THEN
        UPDATE payroll_components
        SET description = p_description,
            name = p_name,
            component_type = p_component_type,
            calculation_type = p_calculation_type,
            updated_at = CURRENT_TIMESTAMP
        WHERE company_id = p_company_id AND id = p_id; 
        RETURN QUERY SELECT 200 AS status_code, 'payroll component updated successfully'::TEXT AS message;
    ELSE
        INSERT INTO payroll_components (company_id, name, description, component_type, calculation_type)
        VALUES (p_company_id, p_name, p_description, p_component_type, p_calculation_type);
        RETURN QUERY SELECT 201 AS status_code, 'payroll component created successfully'::TEXT AS message;
    END IF;
END;
$$;