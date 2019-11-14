﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Revature.Room.DataAccess.Entities;

namespace Revature.Room.DataAccess.Migrations
{
    [DbContext(typeof(RoomServiceContext))]
    [Migration("20191114161034_Initialize")]
    partial class Initialize
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("Revature.Room.DataAccess.Entities.Room", b =>
                {
                    b.Property<int>("RoomID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("ComplexID")
                        .HasColumnType("integer");

                    b.Property<int>("Gender")
                        .HasColumnType("integer");

                    b.Property<DateTime>("LeaseEnd")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("LeaseStart")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("NumberOfBeds")
                        .HasColumnType("integer");

                    b.Property<string>("RoomNumber")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("RoomType")
                        .HasColumnType("integer");

                    b.HasKey("RoomID");

                    b.ToTable("Room");
                });
#pragma warning restore 612, 618
        }
    }
}
