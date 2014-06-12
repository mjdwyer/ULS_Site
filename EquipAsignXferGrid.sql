USE [ULS_db1]
GO

/****** Object:  View [dbo].[vw_EquipAssignXferGrid]    Script Date: 12/12/2013 17:03:54 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER OFF
GO



  CREATE VIEW [dbo].[vw_EquipAssignXferGrid]
  AS SELECT
		a.equip_id,
		a.return_dt,
		a.assigned_dt,
		c1.condition_descr as asgn_cond_descr,
		c2.condition_descr as ret_cond_descr,
		a.asgn_miles,
		a.asgn_hours,
		a.ret_miles,
		a.ret_hours,
		a.assign_id,
		t.type_desc,
		mk.make_descr,
		md.model_descr,
		e.equip_year,
		a.assigned_to
  FROM dbo.assignments a
	LEFT JOIN dbo.condition_avt c1 ON a.asgn_condition_id = c1.condition_id
	LEFT JOIN dbo.condition_avt c2 ON a.ret_condition_id = c2.condition_id
	JOIN dbo.equipment e ON e.equip_id = a.equip_id
	LEFT JOIN equip_type_avt t ON e.type_id = t.type_id
	LEFT JOIN make_avt mk ON e.make_id = mk.make_id
	LEFT JOIN model_avt md ON e.model_id = md.model_id



GO


