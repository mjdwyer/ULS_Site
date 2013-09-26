using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ULS_Site.Models
{
    public class equipmentCls
    {
        public String equip_id { get; set; }
        public String equipType { get; set; }
        public String makeType { get; set; }
        public String modelType { get; set; }
        public DateTime serv_due_dt { get; set; }

    }

    public class equipImages
    {
        public int image_id { get; set; }
        public String equip_id { get; set; }
        public String image_type { get; set; }
        public String image_path { get; set; }

    }

    public class userRolesCls
    {
        public String role_name { get; set; }

    }


}
