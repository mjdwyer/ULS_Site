USE [ULS_db1]
GO

/****** Object:  View [dbo].[vw_ToolsAssignXferGrid]    Script Date: 12/12/2013 17:05:29 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER OFF
GO



  CREATE VIEW [dbo].[vw_ToolsAssignXferGrid]
  AS SELECT
		a.tool_id,
		a.assigned_to,
		a.assigned_dt,
		a.return_dt,
		c1.condition_descr as asgn_cond_descr,
		c2.condition_descr as ret_cond_descr,
		a.assign_id,
		tt.tools_type_descr,
		td.tools_descr_descr,
		ts.size_descr,
		tm.tool_mfg_descr
  FROM dbo.tools_assign a
	LEFT JOIN dbo.condition_avt c1 ON a.asgn_condition_id = c1.condition_id
	LEFT JOIN dbo.condition_avt c2 ON a.ret_condition_id = c2.condition_id
	JOIN dbo.tools t ON t.tool_id = a.tool_id
	left join dbo.tools_item_avt tt on tt.tools_type_id = t.item_id
	left join dbo.tools_descr_avt td on  td.tools_descr_id = t.descr_id
	left join dbo.tool_size_avt ts on ts.size_id = t.size_id
	left join dbo.tool_mfgs_avt tm on tm.tool_mfg_id = t.mfg_id


GO


