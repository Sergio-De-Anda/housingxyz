using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace Revature.Tenant.Tests.LibTests
{
    public class TenantTest
    {
        [Fact]
        public void Tenant_Test()
        {
            Assert.Throws<ArgumentException>(() => new Lib.Models.Tenant { Id = -1 });
        }

        [Fact]
        public void Tenant_First_Name_Empty()
        {
            Assert.Throws<ArgumentException>(() => new Lib.Models.Tenant { FirstName = "" });
        }

        [Fact]
        public void Tenant_Last_Name_Empty()
        {
            Assert.Throws<ArgumentException>(() => new Lib.Models.Tenant { LastName = "" });
        }

        [Fact]
        public void Tenant_Room_Id_Empty()
        {
            Assert.Throws<ArgumentException>(() => new Lib.Models.Tenant { RoomId = -1 });
        }

        [Fact]
        public void Tenant_Email_Empty()
        {
            Assert.Throws<ArgumentException>(() => new Lib.Models.Tenant { Email = "" });
        }

        [Fact]
        public void Tenant_Car_Id_Empty()
        {
            Assert.Throws<ArgumentException>(() => new Lib.Models.Tenant { CarId = -1 });
        }

        [Fact]
        public void Tenant_Address_Id_Empty()
        {
            Assert.Throws<ArgumentException>(() => new Lib.Models.Tenant { AddressId = "" });
        }

        [Fact]
        public void Tenant_Gender_Empty()
        {
            Assert.Throws<ArgumentException>(() => new Lib.Models.Tenant { Gender = "" });
        }

    }
}
